import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Badge } from "@mui/material";
import { useCart } from "src/context/context";

export const IconCart = () => {
    const { cart } = useCart();
    return(        
    <Badge badgeContent={cart.lineItems.length} color='primary' >
        <ShoppingCartIcon/>
    </Badge>
    )
}