import { useHistory } from "react-router-dom";
import { useEffect } from 'react';

function ProductDetailsScreen() {

    const history = useHistory(); 
    console.log(history.location.state.product);

    return (
        <div>Product details</div>
    );
}

export default ProductDetailsScreen;