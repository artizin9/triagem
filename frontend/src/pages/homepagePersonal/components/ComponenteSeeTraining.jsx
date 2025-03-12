import { useEffect, useState } from "react"
import { CardTreino } from "./CardTreino"
import { getAlunotoTraining } from "../../../utils/api/api"

export function Component1({ Alunos, WithDraw, SeeExercise }) {
    const [alunosTreinos, setAlunosTreinos] = useState([])

    const fetchAlunosTreinos = async () => {
        try {
            const alunosTreinosData = await Promise.all(
                Alunos.map(async (aluno) => {
                    const trainingData = await getAlunotoTraining(aluno.id)
    
                    console.log(`Treinos para ${aluno.id}:`, trainingData) // Verifica o que está vindo
    
                    return {
                        ...aluno,
                        training: trainingData?.TrainingAluno?.map(t => t.treino) || [],
                    }
                })
            )
            setAlunosTreinos(alunosTreinosData)
        } catch (error) {
            console.error("Erro ao buscar treinos dos alunos:", error)
        }
    }
    
    

    useEffect(() => {
        fetchAlunosTreinos()
    }, [Alunos])

    return (
        <>
            {alunosTreinos.map((aluno) =>
                aluno?.training?.map((training) => (
                    <CardTreino
                        key={training.id}
                        aluno={aluno}
                        treino={training}
                        WithDraw={WithDraw}
                        SeeExercise={SeeExercise}
                    />
                ))
            )}
        </>
    )
}