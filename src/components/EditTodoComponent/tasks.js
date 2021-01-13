import { Checkbox } from "@material-ui/core";

export default function Tasks(props) {
    return props.tasks.map((task, i) => {
      return (
        <div>
          <Checkbox
            checked={task.checked}
            onChange={() => props.changeTaskChecked(!task.checked, i)}
          />
          <span>{task.text}</span>
        </div>
      );
    });
  }
