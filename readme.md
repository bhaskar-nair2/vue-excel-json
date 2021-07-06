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
