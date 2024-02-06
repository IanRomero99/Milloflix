<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Netflix Login Page</title>
    <link rel="stylesheet" href="./login.css">
</head>
<body>
    <nav>
        <a href="#"><img src="../img/MILLOFLIX-31-1-2024.png" alt="logo"></a>
    </nav>
    <div class="form-wrapper">
    <h2>Sign In</h2>
    <form action="#">
        <div class="form-control">
            <input type="text" placeholder="Email or phone number">
            <!-- <label>Email or phone number</label> -->
        </div>
        <div class="form-control">
            <input type="password" placeholder="Password">
            <!-- <label>Password</label> -->
        </div>
        <button type="submit"> Sign In </button>
        <div class="form-help">
            <div class="remember-me">
                <input type="checkbox" id="remember-me">
                <label for="remember-me">Remember Me</label>
            </div>
            <a href="#">Need Help</a>
        </div>

    </form>
    <p>New to Netflix? <a href="#">Sign up now</a></p>
    <small>
        This page is protected by Google reCAPTCHA to ensure you're not a bot 
        <a href="#">Learn more.</a>
    </small>
    </div>
</body>
</html>