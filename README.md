[![vub.sk](https://user-images.githubusercontent.com/40350798/137112594-2fdc703f-5c14-4ab1-b956-f058120f0603.png)](https://www.vub.sk/en)

# VUB eCard nodejs
Package to use [VUB eCard payment](https://www.vub.sk/en/companies-entrepreneurs/products-services/electronic-banking/ecard/) platform easily in nodejs application 

## Installation
Using npm:

```sh
npm i @forbestclients/vub-ecard
```

## Usage
In Node.js:

### Initialization
```js
const VubEcard = require('@forbestclients/vub-ecard').default;

const vub = new VubEcard('CLIENT_ID', 'STORE_KEY');
```

### Initialize with config object

The package can be initialized with several options:

```js
const VubEcard = require('@forbestclients/vub-ecard').default;

const vub = new VubEcard('CLIENT_ID', 'STORE_KEY', {
    test: true,
    currency: 978,
    transactionType: 'Auth',
    language: 'sk',
    storeType: '3d_pay_hosting'
});
```

| Option            | Default                         | Description   |
| ----------------- | ------------------------------- | ----------------------- |
| `test`            | `false`                         | Tells if you want to use production or test interface of payment gateway |
| `currency`        | 978                             | Currency ISO 4217 numeric code |
| `transactionType` | `TransactionTypes.Auth`         | Transaction type (authorization or pre-autuhorization) |
| `language`        | `Languages.SK`                  | Language used on payment gateway|
| `storeType`       | `StoreTypes.Secure3DPayHosting` | Payment model od merchant |

### Generate payment button
```js
vub.setOrder('ORD123456' /* ORDER ID */, 10.99 /* ORDER PRICE */);
vub.setCallbackSuccessUrl('http://yourpage.domain/ok');
vub.setCallbackErrorUrl('http://yourpage.domain/fail');

vub.generateForm();
```

### Change button text
```js
vub.generateForm([], {}, { value: 'proceed to payment' })
```

### Validate response
```js
vub.validateResponse(POST_DATA)
```
 Note: you can get validation errors by calling `vub.getError()`

## Package created by

[![forbestclients.com](https://www.grandus.sk/images/forbestclients.png)](https://www.grandus.sk) \
eshops, programming, consultations