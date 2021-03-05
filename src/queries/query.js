import { gql } from '@apollo/client';

export const getProducts = (currency) => {

return gql`
  { 
    products {
    id,
    title,
    image_url,
    price(currency: ${currency}),
  }
}
`;
}

export const getCurrencies = () => {
    return gql `
        { 
            currency
        }
    `
}