## JavaScript Calculator

A classic calculator with following functionalities:

1. Adding, subtracting, multiplying and dividing;
2. Operating on integers and on decimals;
3. Clearing output with CE button;
4. Cancelling previous operation with AC button. It's possible to revert to the very beginning of a whole calculation.

---

### About

This project was created during FreeCodeCamp front-end course. It's a [task from Advanced Front End Development Projects section](https://www.freecodecamp.org/challenges/build-a-javascript-calculator).

Tools: JavaScript, jQuery, SCSS, CSS, CSS Reset, HTML.

---

### Issues

* Reverting was causing a lot of problems. Even though it seems to work now, I can't rule out some errors still lurking inside revert() (which handles AC button); to be honest, this whole function is quite messy. It seems that my initial approach to how a calculator should work didn't go well with reverting mechanism.

* No typing from keyboard yet.

* No typing negative numbers yet (of course, they can appear as results and can be used in chaining).

---

#### License

&copy; 2018 Jarosław Sopiński

This repository is licensed under the MIT license.
