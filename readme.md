# Vue Excel Upload

Vue plugin to read/write excel files and process them in vuex state.

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
