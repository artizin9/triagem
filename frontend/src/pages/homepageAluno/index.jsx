import { Home } from "./main"
import { useState, useEffect } from "react"
import { ModalLogOut } from "./modals/logOut"
import { SeeExercise } from "./modals/SeeExerciseModal"
import { InfoExercise } from "./modals/InfoExercise"
import { BookTraining } from "./modals/bookTraining"
import { getUser } from "../../utils/api/api"

export function HomeAluno(){
    const [TreinoAluno, setTreinoAluno] = useState([])
    const [LogOutModal, setLogOutModal] = useState(false)
    const [SeeExerciseModal, setSeeExerciseModal] = useState(false)
    const [InfoExerciseModal, setInfoExerciseModal] = useState(false)
    const [calendarModal, setCalendarModal] = useState(false)
    
    useEffect(() => {
        async function getTrainings(){
            const response = await getUser()
            const { UserTreino } = response
            setTreinoAluno(UserTreino)
        }

        getTrainings()
    }, [])

    return (
    <div className="h-screen w-screen relative">
        <Home 
        OpenModalLogOut={() => setLogOutModal(true)} 
        OpenModalSeeExercise={() => setSeeExerciseModal(true)}
        TreinoAluno={TreinoAluno}
        setTreinoAluno={setTreinoAluno}
        OpenCalendarModal={() => setCalendarModal(true)}
        />
        <ModalLogOut
                Open={LogOutModal}
                Close={() => setLogOutModal(false)}
            />
        <SeeExercise
            Open={SeeExerciseModal}
            Close={() => setSeeExerciseModal(false)}
            TreinoAluno={TreinoAluno}
            OpenModalExercise={() => setInfoExerciseModal(true)}
        />
        <InfoExercise
            Open={InfoExerciseModal}
            Close={() => setInfoExerciseModal(false)}
            TreinoAluno={TreinoAluno}
        />
        <BookTraining 
        Open={calendarModal}
        Close={() => setCalendarModal(false)}
        />
    </div>
    )
}