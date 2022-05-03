import { useTranslation } from "react-i18next";
import { LinksFunction, NavLink, Outlet } from "remix";
import { links as tabsLinks, Tabs } from "~/components/Tabs";
import * as Text from "~/components/text";

export let links: LinksFunction = function () {
    return [...Text.links(), ...tabsLinks()];
};


export default function UsersRoute() {
    let { t } = useTranslation(["common"]);
    return (
        <div>
            <Text.Heading level="h1">{t`users.list.users`}</Text.Heading>
            <Tabs>
                <NavLink to="./list">{t`users.list.all`}</NavLink>
                <NavLink to="./invite">{t`users.list.invite`}</NavLink>
            </Tabs>

            <Outlet></Outlet>
        </div>
    );
}
