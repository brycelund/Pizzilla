import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, CardHeader, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap'
import axios from 'axios'

export default function KitchenPage(props) {
  const [orders, setOrders] = useState([])

  async function getOrders() {
    let host = window.location.origin
    host = host.replace(/:[0-9]*/gi, '')
    let response = await axios.get(`${host}:3001/api/orders`)
    let orders = response.data
    orders = orders.filter((order) => order.status == 'pending')
    setOrders(orders)
  }

  // Run this "Effect" once at the beginning of the component load
  useEffect(() => {
    setInterval(() => {
      getOrders()
    }, 1000)
  }, [])

  async function markOrderAsComplete(id) {
    let host = window.location.origin
    host = host.replace(/:[0-9]*/gi, '')
    await axios.put(`${host}:3001/api/orders/${id}`, {
      status: 'complete'
    })
    getOrders()
  }

  // Change the color based on how long they've been waiting!
  function getHeaderStyle(order) {
    let timeWaiting = Date.now() - Date.parse(order.orderTimestamp)
    // Divide my 1000 to go from milliseconds to seconds. Divide by 60 to go from seconds to minutes.
    let minutesWaiting = timeWaiting / 1000 / 60

    if (minutesWaiting > 2) {
      return {
        backgroundColor: '#e74c3c',
        color: 'white'
      }
    } else if (minutesWaiting > 1) {
      return {
        backgroundColor: '#F2D048'
      }
    } else {
      return {
        backgroundColor: '#E0E0E0'
      }
    }
  }

  // Change the color based on how long they've been waiting!
  function getWaitTime(order) {
    let timeWaiting = Date.now() - Date.parse(order.orderTimestamp)
    // Divide my 1000 to go from milliseconds to seconds. Divide by 60 to go from seconds to minutes.
    let minutesWaiting = timeWaiting / 1000 / 60

    return Math.round(minutesWaiting)
  }

  // Put together all the content we'll put inside the card
  function getCardContent(order) {
    let content = []
    let size = (
      <div>
        <strong>Size:</strong> {order.size} inch
      </div>
    )
    let toppingsheading = (
      <div>
        <strong>Toppings:</strong>
      </div>
    )
    let toppings = order.toppings.map((t) => {
      return <div>{t}</div>
    })

    content = [size, toppingsheading, toppings]
    return content
  }

  return (
    <div className='orderPage'>
      <Container>
        <Row>
          {/* md=3 means it will take up 3 of the 12 columns for each card. So there will be 4 cards per row 12/3=4 */}
          {orders &&
            orders.map((order, index) => {
              return (
                <Col md='3' className='my-2' key={`order${index}`}>
                  <Card>
                    <CardHeader style={getHeaderStyle(order)}>
                      {order.customer} - {getWaitTime(order)} min
                    </CardHeader>
                    <CardBody>
                      <CardTitle>
                        <strong></strong>
                      </CardTitle>
                      <CardSubtitle>{[getCardContent(order)]}</CardSubtitle>
                      <CardText></CardText>
                      <Button color='success' onClick={() => markOrderAsComplete(order._id)}>
                        Complete
                      </Button>
                    </CardBody>
                  </Card>
                </Col>
              )
            })}
        </Row>
      </Container>
    </div>
  )
}
