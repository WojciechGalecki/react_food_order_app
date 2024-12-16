import { useContext } from "react";
import { useActionState } from "react";

import Input from "./Input";
import { OrderContext } from "../store/OrderContext";
import { saveData } from "../http";
import { isNotEmpty, isEmail } from "../utils/validation";

const mainUrl = "http://localhost:3000";

export default function CheckoutForm({ onClose }) {
  const { totalItemsPrice, items } = useContext(OrderContext);

  async function submitAction(s, formData) {
    const fullName = formData.get("fullName");
    const email = formData.get("email");
    const street = formData.get("street");
    const postalCode = formData.get("postalCode");
    const city = formData.get("city");

    let errors = [];

    if (items.length === 0) {
      errors.push("No order items!");
    }

    if (!isNotEmpty(fullName)) {
      errors.push("Please provide a full name!");
    }

    if (!isEmail(email)) {
      errors.push("Invalid email address!");
    }

    if (!isNotEmpty(street)) {
      errors.push("Please provide a street!");
    }

    if (!isNotEmpty(postalCode)) {
      errors.push("Please provide a postal code!");
    }

    if (!isNotEmpty(city)) {
      errors.push("Please provide a city!");
    }

    if (errors.length > 0) {
      return {
        errors,
        values: {
          fullName,
          email,
          street,
          postalCode,
          city,
        },
      };
    }

    try {
      await saveData(
        `${mainUrl}/orders`,
        "POST",
        JSON.stringify({
          order: {
            items,
            customer: {
              email,
              name: fullName,
              street,
              city,
              "postal-code": postalCode,
            },
          },
        })
      );
    } catch (err) {
      errors.push(err.message);
      return { errors };
    }

    return { errors: null };
  }

  const [orderState, orderAction, pending] = useActionState(submitAction, {
    errors: null,
  });

  return (
    <div className="control">
      <h2>Checkout</h2>
      <p>Total Amount: ${totalItemsPrice}</p>
      <form action={orderAction}>
        <Input
          key="fullName"
          id="fullName"
          label="Full Name"
          defaultValue={orderState.values?.fullName}
        />
        <Input
          key="email"
          id="email"
          label="E-Mail Address"
          type="email"
          defaultValue={orderState.values?.email}
        />
        <Input
          key="street"
          id="street"
          label="Street"
          defaultValue={orderState.values?.street}
        />
        <div className="control-row">
          <Input
            key="postalCode"
            id="postalCode"
            label="Postal Code"
            defaultValue={orderState.values?.postalCode}
          />
          <Input
            key="city"
            id="city"
            label="City"
            defaultValue={orderState.values?.city}
          />
        </div>

        {orderState.errors && (
          <ul>
            {orderState.errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}

        <button onClick={onClose}>Close</button>
        <button className="button" type="submit" disabled={pending}>
          Submit Order
        </button>
      </form>
    </div>
  );
}
