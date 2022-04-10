import {
    Form,
    Link,
    LinksFunction,
    useActionData,
    useSearchParams,
    useTransition,
} from "remix";
import { createFormValidationCatchBoundary } from "~/components/CatchBoundary";
import { RequestContext } from "~/components/context";
import { AuthController } from "~/controllers/admin/AuthController";
import { RequestResponse } from "~/models/RequestResponse";
import { ActionDataFunction } from "~/utils/remix";
import { AUTH_ROUTES } from "./admin";
import routeStyle from "./register.css";
import { Button, links as buttonLinks } from "~/components/button";
import {
    ButtonGroup,
    links as buttonGroupLinks,
} from "~/components/buttonGroup";
import * as Text from "~/components/text";
import {
    TextInput,
    links as textInputLinks,
} from "~/components/form/TextInput";

export let links: LinksFunction = function () {
    return [
        { rel: "stylesheet", href: routeStyle },
        ...buttonGroupLinks(),
        ...buttonLinks(),
        ...textInputLinks(),
        ...Text.links(),
    ];
};

export let action: ActionDataFunction = async function (args) {
    const controller = new AuthController();

    return controller.registerUser(args);
};

export const CatchBoundary = createFormValidationCatchBoundary(RegisterRoute);

export default function RegisterRoute() {
    let [searchParams] = useSearchParams();
    let actionData = useActionData<RequestResponse>();
    let transition = useTransition();

    return (
        <RequestContext.Provider value={{ error: actionData?.error }}>
            <Form method="post" className="register-user">
                <Text.Heading level="h2">Welcome to the team</Text.Heading>

                <Text.Text as="span" size="md">
                    All invited people will be granted access to all sites
                    within your organisation
                </Text.Text>

                <Text.Paragraph>Already A Member?</Text.Paragraph>
                <Link to={AUTH_ROUTES.login}>Log In</Link>
                <fieldset
                    disabled={
                        transition.state === "submitting" || !!actionData?.data
                    }
                >
                    <TextInput
                        name="firstName"
                        label="First name"
                        type="text"
                    />
                    <TextInput name="lastName" label="Last name" type="text" />
                    <TextInput
                        name="email"
                        label="E-mail"
                        autoComplete="username"
                        type="email"
                    />
                    <TextInput
                        name="password"
                        label="Password"
                        type="password"
                        autoComplete="new-password"
                    />
                    <TextInput type="hidden" name="token" />
                    <ButtonGroup alignChildren="center">
                        <Button appearance="primary">Register</Button>
                    </ButtonGroup>
                </fieldset>
            </Form>
        </RequestContext.Provider>
    );
}
