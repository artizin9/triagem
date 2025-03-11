import { useState, useEffect } from "react"
import { me, deleteUser } from '../../utils/api/api'
import { Error } from "../../utils/error/errorAuth"
import { ModalLogOut } from "./modals/LogOut"
import { CreateAluno } from "./modals/modalAluno/ModalCreateAluno"
import { UpdateAluno } from "./modals/modalAluno/ModalUpdateAluno"
import { DeleteAluno } from "./modals/modalAluno/ModalDeleteAluno"
import { SeeTraining } from "./modals/modalAluno/ModalSeeTraining"
import { DeleteTrainingAluno } from "./modals/modalAluno/ModalDeleteTrainingAluno"
import { SeeExercise } from "./modals/modalAluno/ModalSeeExercise"
import { CreateTreino } from "./modals/modalTreino/ModalCreateTreino"
import { UpdateTreino } from "./modals/modalTreino/ModalUpdateTreino"
import { DeleteTreino } from "./modals/modalTreino/ModalDeleteTreino"
import { ReadExercise } from "./modals/ModalExercise/ModalReadExercise"
import { CreateExercise } from "./modals/ModalExercise/ModalCreateExercise"
import { SendTraining } from "./modals/modalTreino/ModalSendTrainig"
import { UpdateExercise } from "./modals/ModalExercise/ModalUpdateExercise"
import { DeleteExercise } from "./modals/ModalExercise/ModalDeleteExercise"
import { Aluno } from "./aluno/aluno"
import { Treino } from "./treino/treino"

const PhotoDefaultSrc = "data:image/svg+xml,%3Csvg width='150' height='150' viewBox='0 0 150 150' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='75' cy='75' r='75' fill='%23252424'/%3E%3Cpath d='M127.53 128.642C127.53 121.785 126.362 112.859 123.609 106.524C120.855 100.189 116.82 94.4326 111.732 89.5839C106.644 84.7352 100.604 80.8891 93.9567 78.265C87.3093 75.6409 80.1847 74.2903 72.9895 74.2903C65.7944 74.2903 58.6697 75.6409 52.0223 78.265C45.3749 80.8891 39.3349 84.7352 34.2472 89.5839C29.1595 94.4326 25.1237 100.189 22.3702 106.524C19.6167 112.859 19.8806 119.484 19.8806 126.341C37.059 139.811 44.664 149.696 73.9359 149.763L81.208 149.054L89.6756 147.63L96.3998 145.968L101.132 144.544L105.614 142.693L109.101 141.126L112.588 139.323L116.074 137.281L119.312 135.145L121.678 133.474L124.044 131.633L124.542 131.253L125.04 130.816L126.036 129.971L127.157 128.974L127.53 128.642Z' fill='%23A9A9A9'/%3E%3Ccircle cx='74.7635' cy='39.2745' r='28.3912' fill='%23A9A9A9'/%3E%3C/svg%3E"
const Iconreport = (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 14.1667C9.76389 14.1667 9.56597 14.0868 9.40625 13.9271C9.24653 13.7674 9.16667 13.5694 9.16667 13.3333C9.16667 13.0972 9.24653 12.8993 9.40625 12.7396C9.56597 12.5799 9.76389 12.5 10 12.5C10.2361 12.5 10.434 12.5799 10.5938 12.7396C10.7535 12.8993 10.8333 13.0972 10.8333 13.3333C10.8333 13.5694 10.7535 13.7674 10.5938 13.9271C10.434 14.0868 10.2361 14.1667 10 14.1667ZM9.16667 10.8333V2.5H10.8333V10.8333H9.16667ZM4.16667 17.5C3.70833 17.5 3.31597 17.3368 2.98958 17.0104C2.66319 16.684 2.5 16.2917 2.5 15.8333V13.3333H4.16667V15.8333H15.8333V13.3333H17.5V15.8333C17.5 16.2917 17.3368 16.684 17.0104 17.0104C16.684 17.3368 16.2917 17.5 15.8333 17.5H4.16667Z" fill="currentColor"/>
    </svg>)

const IconLogOut = (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.77778 20C4.28889 20 3.87037 19.8259 3.52222 19.4778C3.17407 19.1296 3 18.7111 3 18.2222V5.77778C3 5.28889 3.17407 4.87037 3.52222 4.52222C3.87037 4.17407 4.28889 4 4.77778 4H11V5.77778H4.77778V18.2222H11V20H4.77778ZM14.5556 16.4444L13.3333 15.1556L15.6 12.8889H8.33333V11.1111H15.6L13.3333 8.84444L14.5556 7.55556L19 12L14.5556 16.4444Z" fill="white"/>
    </svg>)

const BorderSelection = (<div className="h-full w-[6px] bg-primary-100 absolute right-0 rounded-lg"/>)

const Buttons = [
    {
        id: 1, 
        name: 'Alunos', 
        img: (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 12C10.9 12 9.95833 11.6083 9.175 10.825C8.39167 10.0417 8 9.1 8 8C8 6.9 8.39167 5.95833 9.175 5.175C9.95833 4.39167 10.9 4 12 4C13.1 4 14.0417 4.39167 14.825 5.175C15.6083 5.95833 16 6.9 16 8C16 9.1 15.6083 10.0417 14.825 10.825C14.0417 11.6083 13.1 12 12 12ZM4 20V17.2C4 16.6333 4.14583 16.1125 4.4375 15.6375C4.72917 15.1625 5.11667 14.8 5.6 14.55C6.63333 14.0333 7.68333 13.6458 8.75 13.3875C9.81667 13.1292 10.9 13 12 13C13.1 13 14.1833 13.1292 15.25 13.3875C16.3167 13.6458 17.3667 14.0333 18.4 14.55C18.8833 14.8 19.2708 15.1625 19.5625 15.6375C19.8542 16.1125 20 16.6333 20 17.2V20H4ZM6 18H18V17.2C18 17.0167 17.9542 16.85 17.8625 16.7C17.7708 16.55 17.65 16.4333 17.5 16.35C16.6 15.9 15.6917 15.5625 14.775 15.3375C13.8583 15.1125 12.9333 15 12 15C11.0667 15 10.1417 15.1125 9.225 15.3375C8.30833 15.5625 7.4 15.9 6.5 16.35C6.35 16.4333 6.22917 16.55 6.1375 16.7C6.04583 16.85 6 17.0167 6 17.2V18ZM12 10C12.55 10 13.0208 9.80417 13.4125 9.4125C13.8042 9.02083 14 8.55 14 8C14 7.45 13.8042 6.97917 13.4125 6.5875C13.0208 6.19583 12.55 6 12 6C11.45 6 10.9792 6.19583 10.5875 6.5875C10.1958 6.97917 10 7.45 10 8C10 8.55 10.1958 9.02083 10.5875 9.4125C10.9792 9.80417 11.45 10 12 10Z" fill="#E8EAED"/>
        </svg>)},
    {
        id: 2,
        name: 'Treinos',
        img: ( <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_43_46)">
            <path d="M20.65 9.37495L19.25 7.97495L20 7.19995L16.8 3.99995L16.025 4.74995L14.6 3.32495L15.35 2.54995C15.7334 2.16662 16.2084 1.97912 16.775 1.98745C17.3417 1.99578 17.8167 2.19162 18.2 2.57495L21.425 5.79995C21.8084 6.18328 22 6.65412 22 7.21245C22 7.77078 21.8084 8.24162 21.425 8.62495L20.65 9.37495ZM8.65002 21.3999C8.26669 21.7833 7.79586 21.9749 7.23752 21.9749C6.67919 21.9749 6.20836 21.7833 5.82502 21.3999L2.60002 18.1749C2.21669 17.7916 2.02502 17.3208 2.02502 16.7624C2.02502 16.2041 2.21669 15.7333 2.60002 15.3499L3.35002 14.5999L4.77502 16.0249L4.00002 16.7749L7.22502 19.9999L7.97502 19.2249L9.40002 20.6499L8.65002 21.3999ZM18.575 12.9999L20 11.5749L12.425 3.99995L11 5.42495L18.575 12.9999ZM11.575 19.9999L13 18.5499L5.45002 10.9999L4.00002 12.4249L11.575 19.9999ZM11.425 14.1499L14.175 11.4249L12.575 9.82495L9.85002 12.5749L11.425 14.1499ZM13 21.3999C12.6167 21.7833 12.1417 21.9749 11.575 21.9749C11.0084 21.9749 10.5334 21.7833 10.15 21.3999L2.60002 13.8499C2.21669 13.4666 2.02502 12.9916 2.02502 12.4249C2.02502 11.8583 2.21669 11.3833 2.60002 10.9999L4.02502 9.57495C4.40836 9.19162 4.87919 8.99995 5.43752 8.99995C5.99586 8.99995 6.46669 9.19162 6.85002 9.57495L8.42502 11.1499L11.175 8.39995L9.60002 6.84995C9.21669 6.46662 9.02502 5.99162 9.02502 5.42495C9.02502 4.85828 9.21669 4.38328 9.60002 3.99995L11.025 2.57495C11.4084 2.19162 11.8792 1.99995 12.4375 1.99995C12.9959 1.99995 13.4667 2.19162 13.85 2.57495L21.425 10.1499C21.8084 10.5333 22 11.0041 22 11.5624C22 12.1208 21.8084 12.5916 21.425 12.9749L20 14.3999C19.6167 14.7833 19.1417 14.9749 18.575 14.9749C18.0084 14.9749 17.5334 14.7833 17.15 14.3999L15.6 12.8249L12.85 15.5749L14.425 17.1499C14.8084 17.5333 15 18.0041 15 18.5624C15 19.1208 14.8084 19.5916 14.425 19.9749L13 21.3999Z" fill="#E8EAED"/>
            </g>
            <defs>
            <clipPath id="clip0_43_46">
            <rect width="24" height="24" fill="white"/>
            </clipPath>
            </defs>
            </svg>)
    }
]


export function Render({imagem}){
    const [name, setName] = useState("")
    const [isHover, setIsHover] = useState(false)
    const [LogOutModal, setLogOutModal] = useState(false)
    const [CreateModal, setCreateModal] = useState(false)
    const [UpdateModal, setUpdateModal] = useState(false)
    const [DeleteModal, setDeleteModal] = useState(false)
    const [SeeModalTreino, setSeeModalTreino] = useState(false)
    const [RetirarTreinoModal, setRetirarTreinoModal] = useState(false)
    const [SeeExerciseModal, setSeeExerciseModal] = useState(false)
    const [CreateModalTreino, setCreateModalTreino] = useState(false)
    const [UpdateModalTreino, setUpdateModalTreino] = useState(false)
    const [DeleteModalTreino, setDeleteModalTreino] = useState(false)
    const [SendModalTreino, setSendModalTreino] = useState(false)
    const [CreateModalExercise, setCreateModalExercise] = useState(false)
    const [ReadModalExercise, setReadModalExercise] = useState(false)
    const [UpdateModalExercise, setUpdateModalExercise] = useState(false)
    const [DeleteModalExercise, setDeleteModalExercise] = useState(false)
    const [id, setId] = useState(1)
    const [alunos, setAlunos] = useState([])
    const [form, setForm] = useState({
        id: Date.now(), // id teste, coloque o id verdadeiro dps
        name: '',
        email: '',
        phone: '',
        state: '',
        city: '',
        password: '',
        photo: PhotoDefaultSrc,
        file: null
    })
    const CleanForm = () => setForm({
        id: Date.now(),
        name: '',
        email: '',
        phone: '',
        state: '',
        city: '',
        password: '',
        photo: PhotoDefaultSrc,
        file: null
    })  

    const [treino, setTreino] = useState([])
    const [formTreino, setFormTreino] = useState({
        id: Date.now(), // id teste, coloque o id verdadeiro dps
        name: '',
        destined: '',
        time: '',
        weekDay: '',
        photo: null
    })
    const CleanTreino = () => setFormTreino({
        id: Date.now(), // id teste, coloque o id verdadeiro dps
        name: '',
        destined: '',
        time: '',
        weekDay: '',
        photo: null
    })

    const [formExercise, setFormExercise] = useState({
        id: Date.now(), // id teste, coloque o id verdadeiro dps
        name: '',
        numberExec: '',
        numberRep: '',
        execByRep: '',
        interval: '',
        description: '',
        photo: null
    })
    const CleanExercise = () => setFormExercise({
        id: Date.now(), // id teste, coloque o id verdadeiro dps
        name: '',
        numberExec: '',
        numberRep: '',
        execByRep: '',
        interval: '',
        description: '',
        photo: null
    })

    const RenderComponent = () => {
        switch (id) {
            case 1:
                return <Aluno 
                        aluno={alunos} 
                        setAluno={setAlunos}
                        OpenCreate={() => {
                            CleanForm()
                            setCreateModal(true)
                        }}
                        OpenUpdate={() => setUpdateModal(true)}
                        OpenDelete={() => setDeleteModal(true)}
                        OpenSeeTraining={() => setSeeModalTreino(true)}
                        setForm={setForm}
                        />
            case 2:
                return <Treino 
                        treino={treino}
                        OpenCreateTraining={() => {
                            CleanTreino()
                            setCreateModalTreino(true)
                        }}
                        OpenUpdateTraining={() => setUpdateModalTreino(true)}
                        OpenDeleteTraining={() => setDeleteModalTreino(true)}
                        OpenSendTraining={() => setSendModalTreino(true)}
                        OpenSeeTraining={() => setReadModalExercise(true)}
                        setFormTreino={setFormTreino}
                       />
        }
    }

    async function DeletarAluno() {
        await deleteUser(form.id)
        setAlunos((alunos) => alunos.filter((aluno) => aluno?.id !== form.id))
        setDeleteModal(false)
    }

    function DeletarTreino(){
        setTreino((treinos) => treinos.filter((treino) => treino.id !== formTreino.id))
        setDeleteModalTreino(false)
    }

    function DeletarExercise() {
        setTreino((treinos) => 
            treinos.map((treino) => {
                if (treino.id === formTreino.id) {
                    return {
                        ...treino,
                        exercise: treino.exercise.filter((exercise) => exercise.id !== formExercise.id)
                    }
                }
                return treino
            })
        )
        setDeleteModalExercise(false)
    }

    useEffect(() => {
        userData();
    }, []);

    async function userData() {
            const { user } = await me()
            const { name } = user
            setName(name)
    } 


    return (
        <div className="w-full h-full flex items-center bg-[#222222] overflow-hidden">
            <div className="bg-[#161616] flex flex-col w-[15%] h-full rounded-tr-lg rounded-br-lg space-y-6 relative">
                <div className="px-2 py-1 flex justify-between items-center">
                    <div className="flex items-center space-x-2 pt-2">
                        <div className="w-8 h-8 rounded-full bg-white">
                            <img src={imagem} className="w-full aspect-square object-cover rounded-full"/>
                        </div>
                        <div className="flex flex-col">
                            <h1 className="font-poppins font-normal text-[13px] text-white">{name}</h1>
                            <h3 className="font-albert font-normal text-[12px] text-primary-200 text-left">Personal</h3>
                        </div>
                    </div>

                    <button className="w-fit h-fit duration-500 text-white hover:text-primary-100"> {Iconreport} </button>
                </div>

                <div className="w-full h-[60%] flex flex-col  space-y-6 items-center justify-center">
                    {Buttons.map((item, index) => (
                        <button
                        key={index} 
                        onClick={() => setId(item.id)}
                        className={`flex space-x-4 items-center duration-500 mt-5 w-full justify-center relative py-2.5 text-white ${item.id === id ? `bg-[#212020] pr-4` : ""}`}>
                            {item.id === id ? BorderSelection : ''}
                            {item.img}
                            <h1 className="font-poppins  font-medium text-[17px]  ">{item.name}</h1>
                        </button>
                    ))}
                </div>

                <div className="w-full absolute bottom-3 flex flex-col items-center justify-center space-y-4">
                    <button 
                    onClick={() => setLogOutModal(true)}
                    onMouseEnter={() => setIsHover(true)}
                    onMouseLeave={() => setIsHover(false)}
                    className="flex space-x-3 items-center duration-500 mt-5 w-full justify-center relative py-2.5  text-white hover:bg-[#212020] hover:pr-4">
                        {isHover ? BorderSelection : ''}
                        {IconLogOut}
                        <h1 className="font-poppins  font-medium text-[17px]"> Sair </h1>
                    </button>

                    <div className="flex w-full flex-col items-center justify-center text-center">
                        <h1 className="text-white pl-2 font-albert font-normal w-full">Precisa de ajuda?</h1>
                        <h2 className="text-primary-100 font-poppins font-medium text-[13px] w-full">Entre em contato</h2>
                    </div>
                </div>
            </div>

            <div className="w-4/5 h-full flex items-center">
                {RenderComponent()}
            </div>

            <ModalLogOut 
            Open={LogOutModal}
            Close={() => setLogOutModal(false)}
            />
            <CreateAluno
            form={form}
            setForm={setForm}
            CleanForm={CleanForm} 
            aluno={alunos}
            setAluno={setAlunos}
            Open={CreateModal}
            Close={() => setCreateModal(false)}
            />
            <UpdateAluno
            form={form}
            setForm={setForm}
            aluno={alunos}
            setAluno={setAlunos}
            Open={UpdateModal}
            Close={() => setUpdateModal(false)}
            />
            <DeleteAluno 
            Open={DeleteModal}
            Close={() => setDeleteModal(false)}
            Delete={DeletarAluno}
            />
            <DeleteTrainingAluno
            Open={RetirarTreinoModal}
            Close={() => setRetirarTreinoModal(false)}
            />
            <CreateTreino 
            Open={CreateModalTreino}
            Close={() => setCreateModalTreino(false)}
            CleanformTreino={CleanTreino}
            formTreino={formTreino}
            setformTreino={setFormTreino}
            formExercise={formExercise}
            treino={treino}
            setTreino={setTreino}
            />
            <UpdateTreino 
            Open={UpdateModalTreino}
            Close={() => setUpdateModalTreino(false)}
            formTreino={formTreino}
            setformTreino={setFormTreino}
            treino={treino}
            setTreino={setTreino}
            />
            <DeleteTreino
            Open={DeleteModalTreino}
            Close={() => setDeleteModalTreino(false)}
            Delete={DeletarTreino}
            />
            <SeeTraining 
            Open={SeeModalTreino}
            Close={() => setSeeModalTreino(false)} 
            Alunos={alunos}
            Treino={treino}
            WithDraw={() => {setRetirarTreinoModal(true)}}
            SeeExercise={() => {
                setSeeModalTreino(false)
                setSeeExerciseModal(true)
            }}
            />
            <SeeExercise
            Open={SeeExerciseModal}
            Back={() => {
                setSeeExerciseModal(false)
                setSeeModalTreino(true)
            }}
            Treinos={treino}
            setFormExercise={setFormExercise}
            form={form}
            setFormTreino={setFormTreino}
            />
            <SendTraining
            Open={SendModalTreino}
            Close={() => setSendModalTreino(false)}
            Alunos={alunos}
            setAlunos={setAlunos}
            setTreino={setTreino}
            Treino={treino}
            formTreino={formTreino}
            setFormTreino={setFormTreino}
            form={form}
            setForm={setForm}
            />
            <CreateExercise
            Open={CreateModalExercise}
            Close={() => setCreateModalExercise(false)}
            Treino={treino}
            setTreino={setTreino}
            formExercise={formExercise}
            setFormExercise={setFormExercise}
            formTreino = {formTreino}
            CleanFormExercise={CleanExercise}
            ReadExercise={() => {
                // FormTreino(treino)
                setFormExercise(treino?.exercise || {})
                setCreateModalExercise(false)
                setReadModalExercise(true)
            }}
            />
            <ReadExercise 
            Back={() => {
                CleanExercise()
                setReadModalExercise(false)
                setCreateModalExercise(true)
            }}
            Close={() => setReadModalExercise(false)}
            Open={ReadModalExercise}
            Treinos={treino}
            form={formTreino}
            setFormExercise={setFormExercise}
            setFormTreino={setFormTreino}
            UpdateExercise={() => {
                setReadModalExercise(false)
                setUpdateModalExercise(true)}}
            DeleteExercise={() => setDeleteModalExercise(true)}
            />
            <UpdateExercise 
            Open={UpdateModalExercise}
            Close={() => setUpdateModalExercise(false)}
            Treino={treino}
            setTreino={setTreino}
            setFormExercise={setFormExercise}
            formExercise={formExercise}
            formTreino={formTreino}
            ReadExercise={() => {
                setReadModalExercise(true)
                setUpdateModalExercise(false)}}
            />
            <DeleteExercise
            Open={DeleteModalExercise}
            Close={() => setDeleteModalExercise(false)}
            Delete={DeletarExercise}
            />
        </div>
    )
}