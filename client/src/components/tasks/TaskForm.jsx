const TaskForm = () => {
    return (
        <div className="formulario">
            <form>
                <div className="contenedor-input">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Task Name..."
                        name="name"
                    />
                </div>

                <div className="contenedor-input">
                    <input
                        type="submit"
                        className="btn btn-primario btn-block btn-submit"
                        value="Add Task"
                    />
                </div>
            </form>
        </div>
    );
}
 
export default TaskForm;