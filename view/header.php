<style>
    .main-menu,
    .main-menu * {
        box-sizing: border-box;
    }

    .main-menu {
        position: relative;
        z-index: 20;
        display: flex;
        align-items: center;
        gap: 0;
        width: 100%;
        margin: 0;
        padding: 0 12px;
        background: linear-gradient(135deg, #0f4c81, #1769aa);
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.16);
        font-family: Arial, Helvetica, sans-serif;
    }

    .main-menu .menu-brand {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        flex: 0 0 auto;
        margin: 0;
        padding: 10px 14px;
        color: #ffffff;
        text-decoration: none;
        font-size: 17px;
        font-weight: 600;
        white-space: nowrap;
    }

    .main-menu .menu-brand:hover {
        background: rgba(255, 255, 255, 0.1);
    }

    .main-menu .menu-brand-icon {
        width: 34px;
        height: 34px;
        object-fit: contain;
        flex: 0 0 auto;
    }
</style>
<nav class="main-menu">
    <a class="menu-brand" href="/">
        <img class="menu-brand-icon" src="/data/logo.png" alt="">
        <span class="menu-brand-label">Les API REST</span>
            </a>
        </nav>

