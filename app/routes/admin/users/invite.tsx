import { useTranslation } from "react-i18next";
import { Form, LinksFunction, useActionData, useTransition } from "remix";
import { Alert, links as alertLinks } from "~/components/alert";
import { Button, links as buttonLinks } from "~/components/button";
import { createFormValidationCatchBoundary } from "~/components/CatchBoundary";
import { RequestContext } from "~/components/context";
import {
    TextInput,
    links as textInputLinks,
} from "~/components/form/TextInput";
import * as Text from "~/components/text";
import { AuthController } from "~/controllers/admin/AuthController";
import { RequestResponse } from "~/models/RequestResponse";
import { TransactionalEmail } from "~/models/transactionalEmail";
import { ActionDataFunction } from "~/utils/remix";

export let links: LinksFunction = function () {
    return [
        { rel: "stylesheet", href: require("./invite.css") },
        ...alertLinks(),
        ...buttonLinks(),
        ...textInputLinks(),
        ...Text.links(),
    ];
};

export let action: ActionDataFunction<TransactionalEmail> = async function (
    args,
) {
    let controller = new AuthController();

    return controller.inviteUser(args);
};

export let CatchBoundary = createFormValidationCatchBoundary(UserInvite);

export default function UserInvite() {
    let { t } = useTranslation(["common"]);
    let transition = useTransition();
    let actionData = useActionData<RequestResponse<TransactionalEmail>>();

    return (
        <RequestContext.Provider value={{ error: actionData?.error }}>
            <Form method="post" className="invitation-form">
                <Text.Paragraph className="subtitle">
                    {t`invite.inviteSubtitle`}
                </Text.Paragraph>

                <fieldset
                    className="invitation-form-elements"
                    disabled={!!actionData?.data || transition.state !== "idle"}
                >
                    <TextInput
                        name="email"
                        block={true}
                        placeholder={t`inviteUserByEmail`}
                        type="email"
                    />

                    <Button appearance="primary" type="submit">
                        {transition.state === "submitting"
                            ? t`button.sendingInvitation`
                            : t`button.sendInvitation`}
                    </Button>
                </fieldset>
                {actionData?.data ? (
                    <Alert type="success" style={{ marginTop: 20 }}>
                        {t`invitationSentSuccessfully`}
                    </Alert>
                ) : null}
            </Form>
        </RequestContext.Provider>
    );
}
