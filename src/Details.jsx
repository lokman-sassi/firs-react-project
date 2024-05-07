import { useParams, useNavigate} from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ErrorBoundary from "./ErrorBoundary";
import fetchPet from "./fetchPet";
import AdoptedPetContext from "./AdoptedPetContext";
import Carousel from "./Carousel";
import { useState, useContext } from "react";
import Modal from "./Modal";

const Details = () => {
    const  {id} = useParams();
    const results= useQuery(["details", id], fetchPet);
    const [showModal, setShowModal] = useState(null);
    const [, setAdoptedPet] = useContext(AdoptedPetContext);
    const navigate = useNavigate();

    if(results.isLoading){
        return(
            <div className="loading-pane">
                <h2 className="loader">⌛</h2>
            </div>
        );
    }

    const pet = results.data.pets[0];

    return (
        <div className="details">
            <Carousel images={pet.images} />
            <div>
                <h1>{pet.name}</h1>
                <h2>
                    {pet.animal} — {pet.breed} — {pet.city}, {pet.state}
                    <button onClick={() => setShowModal(true)}>Adopt {pet.name}</button>
                    <p>{pet.description}</p>
                    {showModal ?(
                      <Modal>
                        <div className="buttons">
                            <h1>Would you like to adopt {pet.name}?</h1>
                            <div>
                               <button onClick={() => {setAdoptedPet(pet); navigate("/");}}>Yes</button>
                               <button onClick={() => setShowModal(false)}>No</button>
                            </div>
                        </div>
                      </Modal>
                    ): null}
                </h2>
            </div>
        </div>
    )
};

function DetailsErrorBoundary(props){
    return(
        <ErrorBoundary>
            <Details {...props}/>
        </ErrorBoundary>
    )
}

export default DetailsErrorBoundary;