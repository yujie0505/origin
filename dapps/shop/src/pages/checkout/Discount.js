import React, { useState } from 'react'
import get from 'lodash/get'

import { useStateValue } from 'data/state'
const { BACKEND_URL } = process.env

const OrderDiscount = ({ cart }) => {
  const [error, setError] = useState()
  const [code, setCode] = useState('')
  const [, dispatch] = useStateValue()
  if (!cart || !cart.items) return null
  const existingCode = get(cart, 'discountObj.code', '').toUpperCase()

  return (
    <form
      className="discount"
      onSubmit={async e => {
        e.preventDefault()
        const res = await fetch(`${BACKEND_URL}/check-discount`, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ code })
        })
        const discount = await res.json()
        if (!discount || !discount.code) {
          setError(true)
        } else {
          dispatch({ type: 'setDiscount', discount })
          setCode('')
          setError(false)
        }
      }}
    >
      <div className="d-flex">
        <input
          type="text"
          className="form-control"
          placeholder="Discount code"
          value={code}
          onChange={e => setCode(e.target.value)}
        />
        <button type="submit" className="btn btn-primary ml-2">
          Apply
        </button>
      </div>
      {!error ? null : (
        <div className="invalid-feedback" style={{ display: 'block' }}>
          Enter a valid discount code
        </div>
      )}
      {!existingCode ? null : (
        <div>
          <span className="badge badge-secondary">
            {existingCode}{' '}
            <a
              href="#"
              onClick={e => {
                e.preventDefault()
                setCode('')
                dispatch({ type: 'removeDiscount' })
              }}
              style={{ color: 'white' }}
            >
              &times;
            </a>
          </span>
        </div>
      )}
    </form>
  )
}

export default OrderDiscount

require('react-styl')(`
`)