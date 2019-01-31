# react-native-fontawesome

[![Coverage Status](https://coveralls.io/repos/github/Davide-Gheri/react-native-fontawesome/badge.svg?branch=develop)](https://coveralls.io/github/Davide-Gheri/react-native-fontawesome?branch=develop)
[![Build Status](https://travis-ci.com/Davide-Gheri/react-native-fontawesome.svg?branch=master)](https://travis-ci.com/Davide-Gheri/react-native-fontawesome)
[![npm version](https://badge.fury.io/js/%40davidegheri%2Freact-native-fontawesome.svg)](https://badge.fury.io/js/%40davidegheri%2Freact-native-fontawesome)

Font Awesome 5 React Native component using SVG with JS and react-native-svg, heavily inpired by the react-fontawesome package

## Introduction

#### Get started

This package is for integrating Font Awesome 5 SVG in JS with React Native,

It leverages the amazing react-native-svg package to render the icon svg in a React native environment

## Installation

```
$ npm i --save @fortawesome/fontawesome-svg-core
$ npm i --save @davidegheri/react-native-fontawesome

$ react-native link
```

## Add more styles or Pro icons

```
$ npm i --save @fortawesome/free-brands-svg-icons
$ npm i --save @fortawesome/free-regular-svg-icons
```

If you are a [Font Awesome Pro](https://fontawesome.com/pro) subscriber you can install Pro packages; this requires [additional configuration](https://fontawesome.com/how-to-use/on-the-web/setup/using-package-managers).

```
$ npm i --save @fortawesome/pro-solid-svg-icons
$ npm i --save @fortawesome/pro-regular-svg-icons
$ npm i --save @fortawesome/pro-light-svg-icons
```

## Usage

Add icons to the library first, usually in you app entry point (App.js)

```javascript
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fab, fas);
```

Then, you can use any of the added icons as:

```javascript
<FontAwesomeIcon icon="coffee" />
```

The default used icon prefix is `fas`, from `@fortawesome/free-solid-svg-icons`, to use another set of icons, pass the prefix to the `icon` prop:

```javascript
<FontAwesomeIcon icon={['fab', 'apple']} />

// Or

<FontAwesomeIcon icon={{prefix: 'fab', iconName: 'apple'}} />
```

If you prefer to not use the `library` method, you can also explicitly import an icon definition and directly use it

```javascript
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

<FontawesomeIcon icon={faCoffee} />;
```

As a recap, the `icon` prop expects a single object:

- It could be an icon object, like `{faCoffee}`.
- It could a string object, like `"coffee"` (the icon must be added to the `library` via `library.add(...)`).
- It could be an `Array` of strings, where the first element is a prefix,
  and the second element is the icon name: `{["fab", "apple"]}` (the icon must be added to the `library` via `library.add(...)`).
- Or it could be an `Object` with `prefix` and `iconName` properties: `{prefix: 'fab', iconName: 'apple'}`.

## Features

[Size](https://fontawesome.com/how-to-use/on-the-web/styling/sizing-icons):

```javascript
<FontAwesomeIcon icon="spinner" size="xs" />
<FontAwesomeIcon icon="spinner" size="lg" />
<FontAwesomeIcon icon="spinner" size="6x" />
```

[Power Transforms](https://fontawesome.com/how-to-use/on-the-web/styling/power-transforms):

```javascript
<FontAwesomeIcon icon="spinner" transform="shrink-6 left-4" />
<FontAwesomeIcon icon="spinner" transform={{ rotate: 42 }} />
```

[Masking](https://fontawesome.com/how-to-use/on-the-web/styling/masking):

```javascript
<FontAwesomeIcon icon="coffee" mask={['far', 'circle']} />
```

### TypeScript

Typings are included in this package. However, most types are defined in the
underlying API library, `@fortawesome/fontawesome-svg-core`.

Several types, including `IconLookup` and `IconDefinition`, appearing above,
actually originate from the `@fortawesome/fontawesome-common-types` package.
They are re-exported from both `@fortawesome/fontawesome-svg-core` and
`@fortawesome/free-solid-svg-icons` (and other icon packs). This is just to
make importing more convenient in some cases. Refer to the `index.d.ts` in any
module to see which types it exports.
