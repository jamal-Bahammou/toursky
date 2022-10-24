import React from 'react'

const NotFound = () => {
    return (
        <main className="main">
            <div className="error">
                <div className="error_title">
                    <h2 className="heading-secondary heading-secondary--error">Uh oh! Somthing went wrong</h2>
                    <h2 className="error__emoji">😢 🤯</h2>
                </div>
                <div className="error__msg">Please try again later.</div>
            </div>
        </main>
    );
}

export default NotFound