import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Input, FormGroup } from 'reactstrap'

export default function CustomerPage(props) {
  const [customerName, setCustomerName] = useState('')

  return (
    <div className='content'>
      <h1>Start Your Order</h1>
      <FormGroup>
        <Input type='text' name='ordername' placeholder='Your Name' className='my-2' value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
      </FormGroup>
      <Link to={{ pathname: '/order', data: { customerName } }}>
        <Button size='lg' color='danger'>
          Start Order
        </Button>
      </Link>
    </div>
  )
}
