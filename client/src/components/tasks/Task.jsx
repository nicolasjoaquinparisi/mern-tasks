const Task = ({task}) => {
    
    const { name, state } = task;

    return (
        <li className="tarea sombra">
            <p>{name}</p>

            <div className="estado">
                {
                    state ?
                        <button
                            type="button"
                            className="completo"
                        >
                            Completed
                        </button>
                    :
                    <button
                        type="button"
                        className="incompleto"
                    >
                        Uncompleted
                    </button>
                }
            </div>

            <div className="acciones">
                <button
                    type="button"
                    className="btn btn-primario"
                >
                    Edit
                </button>

                <button
                    type="button"
                    className="btn btn-secundario "
                >
                    Delete
                </button>
            </div>
        </li>
    );
}
 
export default Task;