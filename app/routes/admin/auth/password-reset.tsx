import { Form, Link, LinksFunction, useActionData, useTransition } from "remix";
import {
    TextInput,
    links as textInputLinks,
} from "~/components/form/TextInput";
import { Alert, links as alertLinks } from "~/components/alert";
import { createFormValidationCatchBoundary } from "~/components/CatchBoundary";
import { RequestContext } from "~/components/context";
import { AuthController } from "~/controllers/admin/AuthController";
import { ActionDataFunction } from "~/utils/remix";
import { Button, links as buttonLinks } from "~/components/button";
import {
    ButtonGroup,
    links as buttonGroupLinks,
} from "~/components/buttonGroup";
import * as Text from "~/components/text";
import { AUTH_ROUTES } from "../../admin";
import { ArrowLeft } from "react-feather";
import { useTranslation } from "react-i18next";

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
    return controller.requestPasswordResetEmail(args);
};

export const CatchBoundary =
    createFormValidationCatchBoundary(ForgotPasswordRoute);

 export let handle = {
        i18n: ["auth"],
    };

export default function ForgotPasswordRoute() {
    let actionData = useActionData();
    let transition = useTransition();
    let { t } = useTranslation(["auth"]);

    return (
        <RequestContext.Provider value={{ error: actionData?.error }}>
            <Form method="post">
                <Text.Heading level="h2">{t`resetYourPassword`}</Text.Heading>
                <Text.Paragraph className="subtitle">
                    {t`reset.subtitle`}
                    
                </Text.Paragraph>

                {actionData?.data ? (
                    <Alert type="success" style={{ marginTop: 20 }}>
                        {t`reset.checkEmail`}
                        
                    </Alert>
                ) : (
                    <fieldset
                        disabled={
                            !!actionData?.data || transition.state !== "idle"
                        }
                    >
                        <TextInput
                            name="email"
                            type="email"
                            autoComplete="username"
                            label={t`reset.emailAddress`}
                        />

                        <Button
                            block
                            appearance="primary"
                            style={{ marginBottom: 20 }}
                        >
                            {t`reset.continue`}
                            
                        </Button>
                        <ButtonGroup alignChildren="center">
                            <Link to={AUTH_ROUTES.login}>
                                <ArrowLeft size={16} />
                                {t`returnToSignIn`}
                                
                            </Link>
                        </ButtonGroup>
                    </fieldset>
                )}
            </Form>
        </RequestContext.Provider>
    );
}
