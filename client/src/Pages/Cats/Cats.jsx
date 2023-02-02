import { useContext, useEffect, useState } from "react";
import { UserContext } from '../../contexts/UserContextWrapper';
import { LOCAL_STORAGE_JWT_TOKEN_KEY } from '../../constants/constants';
import { DateTime } from 'luxon';



export const Cats = () => {
    const [cats, setCats] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [type, setType] = useState('');
    const [breed, setBreed] = useState('');
    const [date, setDate] = useState('');
    const { user } = useContext(UserContext);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/cats?userId=${user.id}`, {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem(LOCAL_STORAGE_JWT_TOKEN_KEY)
            }
        })
            .then(res => res.json())
            .then(data => {
                if (!data.error) {
                    setCats(data);
                }
                setIsLoading(false);
            });
    }, [user.id]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const handleCatsAdd = () => {
        fetch(`${process.env.REACT_APP_API_URL}/cats`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: 'Bearer ' + localStorage.getItem(LOCAL_STORAGE_JWT_TOKEN_KEY)
            },
            body: JSON.stringify({
                type, 
                breed,
                userId: user.id,
                timestamp: date
            })
        })
        .then((res) => res.json())
        .then((data) => {
            if (!data.error) {
                setCats(data);
                setType('');
                setBreed('');
            }
        });
    }

    const handleDeleteCats = (id) => {
        if (window.confirm('Do you really want to delete this cat?')) {
            fetch(`${process.env.REACT_APP_API_URL}/cats/${id}`, {
                method: 'DELETE',
                headers: {
                    authorization: 'Bearer ' + localStorage.getItem(LOCAL_STORAGE_JWT_TOKEN_KEY)
                }
            })
            .then(res => res.json())
            .then(data => {
                setCats(data);
            });
        }
    }


    return (
        <CatsList>
            <Form onSubmit={handleCatsAdd}>
                <Input 
                    placeholder="Type" 
                    required 
                    onChange={(e) => setType(e.target.value)}
                    value={type}
                />
                <Input 
                    placeholder="Breed" 
                    type="string" 
                    required 
                    onChange={(e) => setBreed(e.target.value)}
                    value={amount}
                />
                <Input 
                    placeholder="Date"
                    type="datetime-local"
                    onChange={(e) => setDate(e.target.value)}
                    value={date}
                />
                <Button>Add</Button>
            </Form>
            <h2>Total spent: €{totalSum}</h2>
            {cats.map((exp) => (
                <CatsListItem key={exp.id} onClick={() => handleDeleteCats(exp.id)}>
                    <HoverOverlay>
                        <HoverOverlayContent>DELETE</HoverOverlayContent>
                    </HoverOverlay>
                    <CatsType>
                        {exp.type} ({DateTime.fromISO(exp.timestamp).toFormat('yyyy-LL-dd HH:mm')})
                    </CatsType>
                    <CatsBreed>€{exp.amount}</CatsBreed>
                </CatsListItem>
            ))}
        </CatsList>
    );
}