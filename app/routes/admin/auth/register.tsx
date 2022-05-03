import { Form, Link, LinksFunction, useActionData, useTransition } from "remix";
import { createFormValidationCatchBoundary } from "~/components/CatchBoundary";
import { RequestContext } from "~/components/context";
import { AuthController } from "~/controllers/admin/AuthController";
import { RequestResponse } from "~/models/RequestResponse";
import { ActionDataFunction } from "~/utils/remix";
import { AUTH_ROUTES } from "../../admin";
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
import { useTranslation } from "react-i18next";

export let links: LinksFunction = function () {
    return [
        { rel: "stylesheet", href: require("../auth.css") },
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
    let actionData = useActionData<RequestResponse>();
    let transition = useTransition();
    let { t } = useTranslation(["auth"]);

    return (
        <RequestContext.Provider value={{ error: actionData?.error }}>
            <Form method="post">
                <Text.Heading level="h2">{t`welcomeToTheTeam`}</Text.Heading>

                <Text.Text as="span" size="md">
                    {t`register.subtitle`}
                    
                </Text.Text>

                <fieldset
                    disabled={
                        transition.state === "submitting" || !!actionData?.data
                    }
                >
                    <TextInput
                        name="firstName"
                        label={t`register.firstName`}
                        type="text"
                    />
                    <TextInput name="lastName" label={t`register.lastName`} type="text" />
                    <TextInput
                        name="email"
                        label={t`register.email`}
                        autoComplete="username"
                        type="email"
                    />
                    <TextInput
                        name="password"
                        label={t`register.password`}
                        type="password"
                        autoComplete="new-password"
                    />
                    <TextInput type="hidden" name="token" />
                    <Button
                        appearance="primary"
                        block
                        style={{ marginBottom: 20 }}
                    >
                        {t`register.register`}
                    </Button>
                    <ButtonGroup alignChildren="center">
                        <Text.Paragraph>
                            {t`alreadyMemeber`}{" "}
                            <Link to={AUTH_ROUTES.login}>{t`register.logIn`}</Link>
                        </Text.Paragraph>
                    </ButtonGroup>
                </fieldset>
            </Form>
        </RequestContext.Provider>
    );
}
