import {useState } from 'react';
import NoteContext from './noteContext';

export default function NoteState(props) {
    
let notesInitial = [
    {
      "id": 1,
      "user_id": "24174772-10c6-11ee-8da5-c85acf442577",
      "title": "Note title 1",
      "content": "Note content bas itna hi hai 1",
      "created_at": "2023-06-22T18:06:00.000Z",
      "updated_at": "2023-06-22T18:06:00.000Z"
    },
    {
      "id": 3,
      "user_id": "24174772-10c6-11ee-8da5-c85acf442577",
      "title": "updated title3",
      "content": "updated content3",
      "created_at": "2023-06-23T11:02:00.000Z",
      "updated_at": "2023-06-23T17:38:52.000Z"
    },
    {
      "id": 4,
      "user_id": "24174772-10c6-11ee-8da5-c85acf442577",
      "title": "Lorem",
      "content": "Note content bas itna hi hai 2",
      "created_at": "2023-06-23T11:05:26.000Z",
      "updated_at": "2023-06-23T11:05:26.000Z"
    },
    {
      "id": 5,
      "user_id": "24174772-10c6-11ee-8da5-c85acf442577",
      "title": "Lorem",
      "content": " bas itna hi hai 2",
      "created_at": "2023-06-23T11:05:34.000Z",
      "updated_at": "2023-06-23T11:05:34.000Z"
    },
    {
      "id": 6,
      "user_id": "24174772-10c6-11ee-8da5-c85acf442577",
      "title": "Lorem",
      "content": " bas itna hi hai 2",
      "created_at": "2023-06-23T11:09:28.000Z",
      "updated_at": "2023-06-23T11:09:28.000Z"
    },
    {
      "id": 7,
      "user_id": "24174772-10c6-11ee-8da5-c85acf442577",
      "title": "Lorem",
      "content": " bas itna hi hai 2",
      "created_at": "2023-06-23T11:10:49.000Z",
      "updated_at": "2023-06-23T11:10:49.000Z"
    },
    {
      "id": 8,
      "user_id": "24174772-10c6-11ee-8da5-c85acf442577",
      "title": "updated title",
      "content": "updated content",
      "created_at": "2023-06-23T11:11:31.000Z",
      "updated_at": "2023-06-23T17:23:13.000Z"
    },
    {
      "id": 9,
      "user_id": "24174772-10c6-11ee-8da5-c85acf442577",
      "title": "Changed title",
      "content": "Changed content ",
      "created_at": "2023-06-23T17:25:05.000Z",
      "updated_at": "2023-06-23T17:25:05.000Z"
    }
  ];
  const [notes,setNotes] = useState(notesInitial);
    return (
        <NoteContext.Provider value={{notes,setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}
