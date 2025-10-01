function NotFoundScreen() {
  return (
    <div className="page page--gray page--not-found">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link" href="main.html">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--not-found">
        <div className="not-found-container container">
          <section className="not-found">
            <h1 className="not-found__title">Page not found</h1>
            <p className="not-found__text">
              You can go to <a href="main.html">main page</a>.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}

export default NotFoundScreen;
