import { useTranslation } from "react-i18next";
import { Form, Link, LinksFunction } from "remix";
import { Button, links as buttonLinks } from "~/components/button";
import {
    ButtonGroup,
    links as buttonGroupLinks,
} from "~/components/buttonGroup";
import { createFormValidationCatchBoundary } from "~/components/CatchBoundary";
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
    ];
};

export const action: ActionDataFunction = async function (args) {
    const controller = new AuthController();

    switch (args.request.method) {
        case "POST":
            return controller.authenticateUserWithCredentials(args);

        default:
            return new Response(null, { status: 405 });
    }
};

export const CatchBoundary = createFormValidationCatchBoundary(LoginRoute);

export let handle = {
    i18n: ["auth"],
};

export default function LoginRoute() {
    let { t } = useTranslation(["auth"]);

    return (
        <Form method="post" className="login-form">
            <Text.Heading level="h2">{t`signInToYourAccount`}</Text.Heading>
            <Text.Paragraph className="subtitle">
                {t`pleaseEnterYourDetails`}
            </Text.Paragraph>
            <TextInput
                name="email"
                type="email"
                label={t`login.emailAddress`}
                autoComplete="email"
            />
            <TextInput
                name="password"
                type="password"
                label={t`login.password`}
                autoComplete="password"
            />

            <Button
                block
                className="abc"
                appearance="primary"
                style={{ marginBottom: 20 }}
            >
                {t`login.login`}
               
            </Button>
            <ButtonGroup alignChildren="center">
                <Link to={AUTH_ROUTES.passwordResetEmail}>
                    {t`login.forgotPassword`}
                  
                </Link>
            </ButtonGroup>
        </Form>
    );
}
