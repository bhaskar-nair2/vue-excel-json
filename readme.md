# Vue Excel Upload

Vue plugin to read/write excel files and process them in vuex.

This is a wrapper of the great [Sheetjs](https://github.com/SheetJS/sheetjs) so you don't need to bother about it's complexities.

## Installation

```bash
yarn add vue-excel-upload
```

or

```bash
npm install vue-excel-upload
```

## Useage

In your Vue component

```js
import VueExcel from 'vue-excel-json'
```

then call it in any method

```js
const vueExcel = new VueExcel({ store: this.$store })
vueExcel.setMapping(mappings)
await vueExcel.processFile(this.file, { startRow: 3 })
await vueExcel.parseRawData()
```

Where `mappings` defines the fields, formatters and validators to be used on that value. Mappings are defined like so:

```js
mappings: {
  'A': {
    title: 'name',
    formatter: (value) => value += '/-'
  },
  'B': {
    title: 'description',
    validator: (v) => !!v
  },
}
```

## Details

The idea is to create an excel reader with the following capabilities

- Function to Reading Excel File by Column
- Function to parse data into a specified Object Format (Also allow to inject custmo functions to enhance formatting)
- Fuction to run over specific items.

```js
mounted() {
    excel.init(this.$store)
  },
```

```js
const sampleMapping = {
  'A': {
    title: 'Name',
    formatter: () => { },
    validator: () => { },
  },
  'B': {
    title: 'Name',
    formatter: (value) => value,
    validator: () => { },
  },
};
```

## Issues with reactivity

If you are planning to display the parsed list as a table using computed properties, you may face issues if the store is not registered before calling the computed property. To avoid that, you can simply register store in your component beforehand.

```js
created() {
    VueExcel.registerStore(this.$store)
},
```
