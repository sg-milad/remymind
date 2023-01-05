import {ConfigFactory, registerAs} from '@nestjs/config';
import {AppOptions} from 'firebase-admin';
import {cert} from 'firebase-admin/app';

export default registerAs < AppOptions,
ConfigFactory < AppOptions >> ('firebase', async () => {
    if (!process.env.FIREBASE_CER) {
        throw new Error('Firebase CERT  has been required.');
    }

    // load data from json file.
    // const jsonData = await import(process.env.FIREBASE_CER);
    // console.log(jsonData);
    // console.log("ss",process.env.FIREBASE_CER);

    return {
        credential: cert(
            {
              projectId: "first-sg-milad",              
              clientEmail: "firebase-adminsdk-txrbt@first-sg-milad.iam.gserviceaccount.com",
              privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC+stah16vkzhJH\nYd5YYMEmXARpq4zQxSFBDckmf9w7RazWLe7lrivZXCG7k3XebreL44bKgNars2td\nzX8mcuyv1AVmcckn34LyD++mTEo5lRHTQ9wOX3BYJQLeLvMMrJXlB3cF3J3pGkxl\nzE0jUysmwYnun3ipJSCM7q+rU9kayE6160bts5gU7t0yVa3k7o6Z4KV5fHBrFxSi\nlNoJi7QYMyo3QSBAgnyvW3SHoB62a1MenBVjUDulHePTatMghvD1CBoe0gRSpGtY\nA1NsYY41wzGpur98gAmXDayibugytrQGO03x7os9FiAPbEfsdSQYxEI67Iif45TQ\nTy0Q7OOjAgMBAAECggEADZZ7mzn28Kb+sweWF4Q2LwmhpnZHr3AXnJi8kcAzJowI\nssgm4uAd4rwUV6O8Fp0Bk6rWJcnq9RgKZe6PCUo2DP87+6ubspO6ZloPvUpntyIL\nWTTXUk5z/rimzPZACwUL6mJPFX1XSRulGiAyo0cGGgBY8V/hvpeh8dJnqC47MXof\nSb57qjxruwkfYGw+7oDItzyvEUbKHVI8wkd8w59a/y1/OuhZmxe1jhMh/sEuOQHZ\nNkcIn7cPZhuQjMmIEMsd/i5KZ1NaGfBvezEFHFZbtfpo01Uhe277mEgslDAl1OFQ\nyw8CvvKy70xd7HsaBSiD7Pc76b8etwiPlU090aL79QKBgQD0U2QjpKo3/tevEzUQ\n0q25ExZm6pPqW0QHr0TkZtv/U5h/LIKqzlI+ZRSv1f7NU78yl0IYlrPGtSdYTlNp\nqKyCpJ6vH5V3B1d77Z5msAgkLNIPdsrPjdA7VT1fRr0HNBiw72/Zc6Lnf7ugwSzg\nPN3NQNUgtZpVGJFEtVwyRuNn3QKBgQDHz3nrfKbftpEPBNQKl03gBhBLh/sw3lyS\nSVG7vOrYtQeb586smui3EBQe0jTYBbJZJwWqnRklxXkQ/bBW09bV2wjLwCfmMXSl\nlJy6Ob0djSuYVN/JOCkTJdFqzg0RYk68c/PliZ0YJz28mVXWgoEHG00NZDI1pbMP\nnYQj8H6BfwKBgF7eLmjknC+H5WmWdKlmlIvjTHSDqxF5hI3TUVW6VrvqUrE2sDnw\nSODvULwBxKEnXnsfXku74GxMlM1mBF9nXiyQDQmEov2HvUFif3nx6gdZ2+qjPpae\nwvb23xCqn+U3Jks1fWGa0+s9nrYJrAoZuCnlfZvox9c45dce8ICZI92FAoGAbbVt\nq+71cUA8xZJRGr+Y8rhhmhc/xMVS7r9zMTG5gONlGiVdRUiJHnqlkYa5nSMDmg/i\n/Jrlg+e5Yarpd8M44pMxcS5AuhPNiFzg8R9ixycMGMgBV+qOIwVQxuP8KN9he/fu\nosm8h9aD/1nx16YwUkabOA8bwnkIqDpEo7cYvuECgYEAmyIV/7AxkRAOpfSrgMDt\n62zNZtdQ9vQ3sfhCsJW6XkPl6xizBqga+wqqDQPzHCzhgMncsNv6a7YnZUFKXfyV\ndHiffuBOuWpDRkdnnkgQU2d1EIsPIlO+OdnBgtY06DYt4nEwxdCPZDx/b+zYwtcy\nFGWGvVjZExJOVdmbY/7A2js=\n-----END PRIVATE KEY-----\n"}
        )

    };
},);
