import { useTranslation } from "react-i18next";
import { LinksFunction, NavLink, Outlet } from "remix";
import { links as tabsLinks, Tabs } from "~/components/Tabs";
import * as Text from "~/components/text";

export let links: LinksFunction = function () {
    return [...Text.links(), ...tabsLinks()];
};

export default function MyProfileRoute() {
    let { t } = useTranslation(["common"]);
    return (
        <div>
            <Text.Heading level="h1">{t`profile.myProfile`}</Text.Heading>
            <Tabs>
                <NavLink to="./settings">{t`profile.settings`}</NavLink>
                <NavLink to="./my-articles">{t`profile.myArticles`}</NavLink>
            </Tabs>

            <Outlet></Outlet>
        </div>
    );
}
