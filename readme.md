# PHYSICS CODE: WEBSITE

[![Physics Code Logo](https://github.com/pauld0051/Physics-Code-2/blob/master/assets/images/logo-main.png "Physics Code Logo")](https://pauld0051.github.io/Physics-Code-2)

## CONTENTS

- [Description](#description)

  - [Goals](#site-goals)

    - [Notes](#notes)
    - [Issues](#known-issues)

## DESCRIPTION

- **Physics Code**
is an educational website aimed at bringing free IB Physics based content to students and teachers worldwide in a simple and aesthetically pleasing manner.
The site will be set up to appear more like a textbook, with simple to read pages, large fonts and easy to identify cards. Each card will be presented with labels and images to help direct the student to making the correct input for their desired result.

The current site is under construction and will remain so for at least until mid 2023. The site is free for you to use but the results can not be guaranteed while still in alpha-phase.

## SITE GOALS

[Top](#contents)

### NOTES

The site is looking for testers. If you stumble across this and like to break code, you can get in contact with me through the page's contact details.

### Known Issues

Samsung Keyboard users can not enter in a negative number when using an input with the type "number". This leads to an impossible outcome for Samsung Keyboard users where a negative number could be essential. This occurs in numerous locations, but was first noticed with the [suvat calculator](https://pauld0051.github.io/Physics-Code-2/suvat.html) and corrected by allowing an input type "text" but limiting it with a pattern (-?[0-9]\d*(\.\d+)?). A second correction will be issued allowing users to click a checkbox next to the input to make the input negative. This will be optional as other users can use a negative sign on their keyboards.

The issue with MathJax equations overlapping the dropdown navigation menu has been fixed. The fix involved adding a CSS rule to the `.p_code` `.navbar-collapse` class, which sets the z-index to a higher value than the MathJax elements. This ensures that the dropdown menu is always visible above the MathJax equations.

```/* MathJax Overlap */
.dropdown-menu {
  z-index: 1000; /* Set the z-index value of the dropdown menu */
}

.mjx-chtml {
  z-index: 999; /* Set the z-index value of MathJax elements */
}

.navbar {
  z-index: 9999;
}

.dropdown-menu.show {
  position: static;
  float: none;
  margin-top: 0;
  margin-left: 0;
  margin-right: 0;
  margin-bottom: 0;
  border: 0;
  border-radius: 0;
  box-shadow: none;
}
