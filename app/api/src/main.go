package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	redis "github.com/go-redis/redis/v7"
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

func homeLink(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Welcome home!!")
}

// Mock mock data
type Mock struct {
	Key   string `json:"key"`
	Value string `json:"value"`
}

func redisTest(w http.ResponseWriter, r *http.Request) {
	hostname := os.Getenv("REDIS_SERVICE_NAME")
	client, err := RedisClient(hostname)
	if err != nil {
		panic(err)
	}
	defer client.Close()
	err = client.Set("test", "test value", 0).Err()
	if err != nil {
		panic(err)
	}

	result := client.Get("test")
	if err = result.Err(); err != nil {
		panic(err)
	}

	mock := Mock{Key: "test", Value: result.Val()}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(mock)
}

// RedisClient creates a redis client and ping it to make sure it can talk to the server.
func RedisClient(hostname string) (*redis.Client, error) {
	client := redis.NewClient(&redis.Options{
		Addr:     fmt.Sprintf("%s:6379", hostname),
		Password: "",
		DB:       0,
	})
	_, err := client.Ping().Result()
	return client, err
}

func main() {
	router := mux.NewRouter().StrictSlash(true)
	router.HandleFunc("/", homeLink)
	router.HandleFunc("/redis", redisTest)
	log.Fatal(http.ListenAndServe(":8080",
		handlers.CORS(handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization", "Accept", "Accept-Language", "Accept-Encoding", "X-CSRF-Token"}),
			handlers.AllowedMethods([]string{"GET", "POST", "PUT", "HEAD", "OPTIONS"}),
			handlers.AllowedOrigins([]string{"*"}))(router)))
}
