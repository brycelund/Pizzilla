import React from 'react'
import { useEffect, useState } from 'react'

export default function PizzaBuilder(props) {
  const [toppings, setToppings] = useState(props.toppings)

  useEffect(() => {
    setToppings(props.toppings.sort(putCheeseAtTheTop))
  }, [props.toppings])

  const styles = {
    pizzaBox: {
      width: '100%',
      position: 'relative'
    },
    pizzaImg: {
      width: '100%',
      position: 'absolute'
    }
  }

  // A function I found on stack overfflow to move an item to the bottom of an array
  const putCheeseAtTheTop = (a, b) => {
    let first = 'cheese'
    return a == first ? -1 : b == first ? 1 : 0
  }

  return (
    <div style={styles.pizzaBox}>
      <img src='/images/Pizza-crust@4x.png' style={styles.pizzaImg} />
      {toppings.map((topping) => {
        return <img src={`/images/Pizza-${topping}@4x.png`} style={styles.pizzaImg} key={`ing${topping}`} />
      })}
    </div>
  )
}
