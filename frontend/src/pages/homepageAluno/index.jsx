export function HomeAluno() {
    const pessoas = [
      { nome: "Claudio", idade: 17 },
      { nome: "Maria", idade: 22 },
      { nome: "João", idade: 30 },
      { nome: "Ana", idade: 25 },
      { nome: "Carlos", idade: 28 }
    ];
  
    return (
      <>
        <div>
          <pre>{JSON.stringify(pessoas, null, 2)}</pre>
        </div>
      </>
    );
  }
  