import Link from 'next/link';
import * as React from 'react';

const linkStyle = {
    marginRight: 15
};

type HeaderProps = {};
const Header: React.FunctionComponent<HeaderProps> = ({ }) => (
    <div>
        <Link href="/">
            <a style={linkStyle}>Home</a>
        </Link>
        <Link href="/about">
            <a style={linkStyle}>About page</a>
        </Link>
    </div>
);

export default Header;