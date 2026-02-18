export const Logo = ({ className }) => {
    return (
        <svg
            className={className}
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect width="40" height="40" rx="12" className="fill-primary" />
            <path
                d="M20 12L28 28H24L22.5 25H17.5L16 28H12L20 12Z"
                className="fill-primary-content"
                style={{ opacity: 0.9 }}
            />
            <path
                d="M20 12L12 28H16L17.5 25H22.5L24 28H28L20 12Z"
                className="fill-white"
                fillOpacity="0.2"
            />
            <rect x="18" y="21" width="4" height="4" rx="1" className="fill-primary-content" />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M20 34C27.732 34 34 27.732 34 20C34 12.268 27.732 6 20 6C12.268 6 6 12.268 6 20C6 27.732 12.268 34 20 34ZM20 38C29.9411 38 38 29.9411 38 20C38 10.0589 29.9411 2 20 2C10.0589 2 2 10.0589 2 20C2 29.9411 10.0589 38 20 38Z"
                className="fill-primary-content"
                fillOpacity="0.1"
            />
        </svg>
    );
};
