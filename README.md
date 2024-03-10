# React Composed Path

A React component for handling clicks outside of a component

```
import {useComposedPath} from 'react-composed-path'
```

## Examples
*Single use:*
```
useComposedPath('#box', '#button', setVisible)
```

*Multiple use:*
```
useComposedPath(['#box1', '#box2'], ['#button1', '#button2'], [setVisible1, setVisible2])
```