import { useTranslation } from "react-i18next";
import {
    Form,
    Link,
    LinksFunction,
    useActionData,
    useSearchParams,
    useTransition,
} from "remix";
import { Alert, links as alertLinks } from "~/components/alert";
import { Button, links as buttonLinks } from "~/components/button";
import {
    ButtonGroup,
    links as buttonGroupLinks,
} from "~/components/buttonGroup";
import { RequestContext } from "~/components/context";
import {
    links as textInputLinks,
    TextInput,
} from "~/components/form/TextInput";
import * as Text from "~/components/text";
import { AuthController } from "~/controllers/admin/AuthController";
import { ActionDataFunction } from "~/utils/remix";
import { AUTH_ROUTES } from "../../admin";

export let links: LinksFunction = function () {
    return [
        { rel: "stylesheet", href: require("../auth.css") },
        ...buttonGroupLinks(),
        ...buttonLinks(),
        ...textInputLinks(),
        ...Text.links(),
        ...alertLinks(),
    ];
};

export let action: ActionDataFunction = async function (args) {
    let controller = new AuthController();
    return controller.setNewPassword(args);
};

export default function NewPasswordRoute() {
    let [searchParams] = useSearchParams();
    let actionData = useActionData();
    let transition = useTransition();
    let { t } = useTranslation(["auth"]);

    return (
        <RequestContext.Provider value={{ error: actionData?.error }}>
            <Form method="post">
                <Text.Heading level="h2" style={{ marginBottom: 40 }}>
                    {t`setNewPassword`}
                    
                </Text.Heading>

                {actionData?.data ? (
                    <Alert type="success" style={{ marginTop: 20 }}>
                {t`updatePassword.alert`}{" "}
                        <Link to={AUTH_ROUTES.login}>{t`updatePass.logiIn`}</Link>{t`updatePass.now`} 
                    </Alert>
                ) : (
                    <fieldset
                        disabled={
                            !!actionData?.data || transition.state !== "idle"
                        }
                    >
                        <TextInput
                            autoFocus
                            type="password"
                            label={t`updatePass.password`}
                            name="password"
                            autoComplete="new-password"
                        />
                        <input
                            name="token"
                            autoComplete="off"
                            defaultValue={searchParams.get("token") ?? ""}
                            type="hidden"
                        />

                        <input
                            name="email"
                            autoComplete="username"
                            defaultValue={searchParams.get("email") ?? ""}
                            type="hidden"
                        />

                        <ButtonGroup alignChildren="center">
                            <Button appearance="primary" block>
                                {t`updatePass.continue`}
                            </Button>
                        </ButtonGroup>
                    </fieldset>
                )}
            </Form>
        </RequestContext.Provider>
    );
}
