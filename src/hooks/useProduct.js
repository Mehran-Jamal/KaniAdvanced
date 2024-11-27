import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { ADD_PRODUCT_URL, DELETE_PRODUCT_URL, GET_PRODUCT_URL, UPDATE_PRODUCT_URL } from '../Constants/utils';
import { fetchunit } from '../redux/Slice/UnitSlice';
import { fetchcolorGroup } from '../redux/Slice/ColorGroupSlice';
import ProductGroup, { fetchProductGroup } from '../redux/Slice/ProductGroup';
import { fetchProductCategory } from '../redux/Slice/ProductCategory';
import { fetchdesign } from '../redux/Slice/DesignSlice';
import { fetchstyle } from '../redux/Slice/StyleSlice';
import { fetchsize } from '../redux/Slice/SizeSlice';
import { fetchHsnCode } from '../redux/Slice/HsnCodeSlice';
import { fetchsupplier } from '../redux/Slice/SupplierSlice';
import { useNavigate } from 'react-router-dom';

const useProduct = ({referenceImages,actualImages}) => {
   

    const navigate = useNavigate();
    const { currentUser } = useSelector((state) => state?.persisted?.user);
    const { token } = currentUser;
    const [Product, setProduct] = useState([]);
    const [edit, setEdit] = useState(false);
    const [currentProduct, setCurrentProduct] = useState({
        productGroup: {},

        colors: {
            id: 0, // Default value
          },
        productCategory: {

        },
        design: {

        },
        hsnCode: { id: 0 },
        
        colorName: "",
        styles: {

        },
        sizes: {

        },
        productId: "",
        barcode: "",
        // images: [ 
        //     {
        //         id: 0,
        //         referenceImage: "",
        //         actualImage: "",
        //         product: "" 
        //     }
        // ],      
        productDescription: "",
        supplier: {},
         supplierCode: {},
        warpColors: "",
    weftColors: "",
    warpYarn: "",
    weftYarn: "",
    weave: "",
    finishedWeight:"",
    materialWeight:"",


    gstDetails:"",
 
hsnCodes:"",
 
    hsn_Sac:"",
    
    gstDescription:"",
    
    taxationType:"",
    
    gstRate:"",
    
    typeOfSupply:"",
 
    pixAndReed: "",
    cost: 0,
    dyeingCost: 0,
    baseColour: "",
    embroideryColors: "",
    fabricWeave: "",
    fabricCode: "",
    fabricCost: 0,
    embroideryCost: 0,
    totalCost: 0,
    kaniColors: "",
    mrp: 0,
    wholesalePrice: 0,
    description: "",
    patternColor: "",
    usdPrice: 0,
    euroPrice: 0,
    gbpPrice: 0,
    rmbPrice: 0,
    units:"",
    gstDetails:"",

    });
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProductGroup(token))
        dispatch(fetchcolorGroup(token))
        dispatch(fetchProductCategory(token))
        dispatch(fetchdesign(token))
        dispatch(fetchstyle(token))
        dispatch(fetchsize(token))
        dispatch(fetchHsnCode(token))
        dispatch(fetchsupplier(token))
    }, []);

    const seloptions = [
        { value: 'RAW', label: 'RAW' },
        { value: 'SEMIFINISHED', label: 'SEMI FINISHED' },
        { value: 'FINISHED', label: 'FINISHED' }
    ];

    const [pagination, setPagination] = useState({
        totalItems: 0,
        data: [],
        totalPages: 0,
        currentPage: 1,
        itemsPerPage: 0
    });

    useEffect(() => {
        getProduct(pagination.currentPage || 1);
    }, []);





   
    const getProduct = async (page) => {
        console.log("iam here");
        try {
            const response = await fetch(`${GET_PRODUCT_URL}?page=${page||1}`, {
                method: "GET",
                headers: {
                    // "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                }
            });
            const data = await response.json();
            console.log(data,"pr datatata")

            setProduct(data?.content);
            setPagination({
                totalItems: data?.totalElements,
                data: data?.content,
                totalPages: data?.totalPages,
                currentPage: data?.number + 1,
                itemsPerPage: data.size
            });
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch Product");
        }
    };



    const handleUpdateSubmit = async (values) => {
  
        console.log(values,"jujujuju");
// try {
//     const url = `${UPDATE_STOCK_URL }/${values?.stockId}`;

//     const response = await fetch(url, {
//         method: "PUT",
//         headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${token}`
//         },
//         body: JSON.stringify(values)
//     });

//     const data = await response.json();
//     if (response.ok) {
//      console.log(data,"coming ");
    
//         toast.success(`Stock Updated successfully`);
//         // navigate('/inventory/viewMaterialInventory');

//     } else {
//         toast.error(`${data.errorMessage}`);
//     }
// } catch (error) {
//     console.error(error);
//     toast.error("An error occurred");
// } finally {
 
// }

};

    const handleDelete = async (e, id) => {
        e.preventDefault();
        try {
            const response = await fetch(`${DELETE_PRODUCT_URL}${id}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (response.ok) {
                toast.success(`${data.message}`);

                // Check if the current page becomes empty
                const isCurrentPageEmpty = Product.length === 1;

                if (isCurrentPageEmpty && pagination.currentPage > 1) {
                    const previousPage = pagination.currentPage - 1;
                    handlePageChange(previousPage);
                } else {
                    getProduct(pagination.currentPage);
                }
            } else {
                toast.error(`${data.errorMessage}`);
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred");
        }
    };

    const handleUpdate = (e, item) => {
       
        e.preventDefault();
        if (item && item.id) {
            navigate(`/product/updateProduct/${item.id}`);
        } else {
            console.error("Item or its ID is missing");
        }
    };

 
    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        console.log("Form values:", values); // Debugging purposes
    
        const formData = new FormData();
    
        try {
            // Prepare the product object without images
            const product = { ...values };
            delete product.images; // Remove images from the product object
    
            // Append the product details as JSON
            formData.append("product", JSON.stringify(product));
           

            Array.from(referenceImages).forEach((file) => formData.append('referenceImages', file)); // Add files
            Array.from(actualImages).forEach((file) => formData.append('actualImages', file));




    
            // Debugging: Check FormData contents
            if (process.env.NODE_ENV === "development") {
                for (let pair of formData.entries()) {
                    console.log(pair[0], pair[1]);
                }
            }
            for (let [key, value] of formData.entries()) {
                console.log(`${key}:`, value,"heyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy");
              }

              console.log(formData,"formmmmmmmmmmmmmmmmmmmmmmmmmmmmm");
    
            // Submit the form data
            const url = edit ? `${UPDATE_PRODUCT_URL}/${currentProduct.id}` : ADD_PRODUCT_URL;
            const method = edit ? "PUT" : "POST";
    
            const response = await fetch(url, {
                method,
                headers: {
                //    "Content-Type":"multipart/form-data",
                    
                    // "Content-Type":"multipart/form-data",
                    "Authorization": `Bearer ${token}`,
                    // "Content-Type":"multipart/form-data",
                },
                
                body: formData,
            });
    
            const data = await response.json();
    
            if (response.ok) {
                toast.success(`Product ${edit ? "updated" : "added"} successfully`);
                resetForm(); // Reset form fields
                setEdit(false); // Reset edit state
                getProduct(pagination.currentPage || 1); // Refresh product list
            } else {
                toast.error(data.errorMessage || "An error occurred while saving the product.");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            toast.error("An error occurred. Please try again.");
        } finally {
            setSubmitting(false); // Stop the form submission spinner
        }
    };
    
    
    

  
    



    const handlePageChange = (newPage) => {
        setPagination((prev) => ({ ...prev, currentPage: newPage }));
        getProduct(newPage);
    };

    return {
        Product,
        edit,
        currentProduct,
        pagination,
        handleDelete,
        handleUpdate,
        handleSubmit,
        handleUpdateSubmit,
        handlePageChange,
        seloptions,
        getProduct,
      
    };
};

export default useProduct;