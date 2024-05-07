import { useState, useContext } from "react";
import AdoptedPetContext from "./AdoptedPetContext";
import { useQuery } from "@tanstack/react-query";
import fetchSearch from "./fetchSearch";
import Results from "./Results";
import useBreedList from "./useBreedList";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"]
//const CLUBS = ["REAL MADRID", "BAYERN MUNICH", "LIVERPOOL", "AC MILAN"]
const SearchParams = () => {
    const [animal, setAnimal] = useState("");
    const [adoptedPet] = useContext(AdoptedPetContext);
    const [breeds] = useBreedList(animal);
    const [requestParams, setRequestParams] = useState({
        location:"",
        animal:"",
        breed:"",
    })

    const results = useQuery(["search", requestParams], fetchSearch);
    const pets = results?.data?.pets ?? [];

    

    return(
        <div className="search-params">
          <form onSubmit={(e) =>{
            e.preventDefault();
            const formData = new FormData(e.target);
            const obj = {
                animal : formData.get("animal") ?? "",
                location : formData.get("location") ?? "",
                breed : formData.get("breed") ?? "",
            }
            setRequestParams(obj)
            
            }}>
            {
            adoptedPet ? (
                <div className="pet image-container">
                  <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
                </div>
               ) : null
            }
            <label htmlFor="location">
                Location
                    <input name="location" id="location" placeholder="Location" />
            </label>
            <label htmlFor="animal">
                Animal
                    <select onChange={(e) => {setAnimal(e.target.value);}}  value={animal} id="animal">
                        <option/>
                        {ANIMALS.map(animal => (
                            <option key={animal}>{animal}</option>
                        ))}
                    </select>
            </label>
            <label htmlFor="breed">
                Breeds
                    <select  id="breed"  disabled = {breeds.length === 0}  name="breed">
                    <option />
                    {breeds.map(breed => (
                        <option key={breed}>{breed}</option>
                    ))}
                    </select>
            </label>
                <button>submit</button>
            </form>
            {
            <Results pets={pets}/>
            }
        </div>
    )

}

export default SearchParams;