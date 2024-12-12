import React, { useEffect, useSearchParams } from 'react';
import './listingIndividual.css';

const ListingIndividual = () =>{
    const [searchParams, setSearchParams] = useSearchParams();

    return (
        <div id="mainBody">
            <div id="leftBody">
                a
            </div>
            <div id="rightBody">
                {searchParams.get("idss")};
            </div>
        </div>
    );
}

export default ListingIndividual;