package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	redis "github.com/go-redis/redis/v7"
	"github.com/gorilla/mux"
)

func homeLink(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Welcome home!!")
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

	fmt.Fprintf(w, result.Val())
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
	log.Fatal(http.ListenAndServe(":8080", router))
}
