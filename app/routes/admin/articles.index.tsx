import { LinksFunction } from "@remix-run/node";
import {
    ActionFunction,
    Form,
    json,
    Link,
    LoaderFunction,
    useLoaderData,
} from "remix";
import { Button, links as buttonLinks } from "~/components/button";
import { TextInput } from "~/components/form/TextInput";
import { Paragraph } from "~/components/text";
import { Article } from "~/models/article";
import { databaseService } from "~/services/databaseService.server";
import { getRange } from "~/utils/paging";
export { CatchBoundary } from "~/components/CatchBoundary";
import * as Text from "~/components/text";
import {
    ButtonGroup,
    links as buttonGroupLinks,
} from "~/components/buttonGroup";
import { ArrowLeft } from "react-feather";
import { Tabs } from "~/components/Tabs";
import { NavLink } from "@remix-run/react";
import { useTranslation } from "react-i18next";

export let links: LinksFunction = function () {
    return [
        { rel: "stylesheet", href: require("./articles.index.css") },
        ...buttonLinks(),
        ...Text.links(),
        ...buttonGroupLinks(),
    ];
};

interface LoaderData {
    articles: Article[];
    previousPageUrl: string | null;
    nextPageUrl: string | null;
}

export const loader: LoaderFunction = async function ({
    request,
}): Promise<LoaderData> {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page") ?? 1);
    const itemsPerPage = 10;
    const range = getRange(page, itemsPerPage);

    const response = await databaseService()
        .from<Article>("articles")
        .select(
            `
      id, title,
      tags ( id, name )
    `,
            { count: "exact" },
        )
        .order("id", { ascending: false })
        .range(range.from, range.to);

    let previousPageUrl = null;
    let nextPageUrl = null;

    if (response.error) {
        throw json(response.error, response);
    }

    if (page > 1) {
        url.searchParams.set("page", (page - 1).toString());
        previousPageUrl = `${url.pathname}?${url.searchParams}`;
    }

    if (page * itemsPerPage < response.count!) {
        url.searchParams.set("page", (page + 1).toString());
        nextPageUrl = `${url.pathname}?${url.searchParams}`;
    }

    return {
        articles: response.data,
        previousPageUrl: previousPageUrl,
        nextPageUrl: nextPageUrl,
    };
};

export const action: ActionFunction = async function ({ request }) {
    switch (request.method) {
        case "DELETE":
            const form = await request.formData();

            await databaseService()
                .from("articles")
                .delete()
                .match({ id: form.get("id") });
            break;
    }

    return null;
};

export default function AdminArticleListing() {
    const data = useLoaderData<LoaderData>();
    let { t } = useTranslation(["common"]);
    function confirmDelete(event: React.FormEvent<HTMLFormElement>) {
        if (window.confirm("Are you sure?") === false) {
            event.preventDefault();
        }
    }

    return (
        <>
            <Text.Heading level="h1">{t`articles.articleList`}</Text.Heading>

            <div className="article-link">
                <ButtonGroup alignChildren="end">
                    <Link to={"/admin/articles/new"}>{t`writeNewArticle`}</Link>
                </ButtonGroup>
            </div>

            <div className="form">
                {data.articles.map((article) => (
                    <Form
                        key={article.id}
                        method="delete"
                        onSubmit={confirmDelete}
                    >
                        <input
                            defaultValue={article.id}
                            name="id"
                            type="hidden"
                        ></input>
                        {article.id},{article.title}
                        <ButtonGroup alignChildren="end">
                            <Link to={`/admin/articles/${article.id}`}>
                                {t`articles.edit`}
                                
                            </Link>
                        </ButtonGroup>
                        <Button appearance="default">{t`articles.deleteButton`}</Button>
                    </Form>
                ))}
            </div>

            <div className="next-prev">
                <ButtonGroup alignChildren="center">
                    {data.previousPageUrl && (
                        <Link to={data.previousPageUrl}>{t`articles.prevPage`}</Link>
                    )}
                    {data.nextPageUrl && (
                        <Link to={data.nextPageUrl}>{t`articles.nextPage`}</Link>
                    )}
                </ButtonGroup>
            </div>
        </>
    );
}
