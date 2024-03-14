import { CiHeart } from "react-icons/ci";
const CardProducts = ({
    image,
    price, 
    size,
    name
}) => {
    return(
        <>
            <div>
                <div className="relative w-full h-[300px]">
                    <img 
                        src={image}
                        className="w-full h-full max-w-full min-h-full object-cover"
                    />
                    <CiHeart 
                        color='white'
                        size={30}
                        className="absolute bottom-0 right-0"
                    />
                </div>
                <h1
                    className="font-bold text-xl"
                >
                    {price}
                </h1>
                {
                    size?.map((size, index) => {
                        return(
                            <h1
                                key={index}
                                className="text-xl"
                            >
                                {size.size}
                            </h1>
                        )
                    })
                }
                <h1
                    className="text-xl"
                >
                    {name}
                </h1>
            </div>
        </>
    )
}

export default CardProducts;