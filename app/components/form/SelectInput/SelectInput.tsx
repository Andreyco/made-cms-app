import { LinksFunction } from "remix";
import {
    CompositeField,
    CompositeFieldProps,
    links as compositeFieldLinks,
} from "../CompositeField/CompositeField";

interface Option {
    label: string;
    value: string;
}

interface Props extends React.ComponentProps<"input">, CompositeFieldProps {
    name: string;
    options: Option[];
}

export let links: LinksFunction = function () {
    return [
        { rel: "stylesheet", href: require("../Form.css") },
        { rel: "stylesheet", href: require("./SelectInput.css") },
        ...compositeFieldLinks(),
    ];
};

export let SelectInput: React.FC<Props> = function ({
    block,
    className,
    label,
    name,
    ...props
}) {
    return (
        <CompositeField name={name} label={label} block={block}>
            <select
                name={name}
                className="form-field-select"
                value={props.value}
                defaultValue={props.defaultValue}
            >
                {props.options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </CompositeField>
    );
};
