import { generateStaticParamsFor, importPage } from "nextra/pages";
import { useMDXComponents as getThemeComponents } from "nextra-theme-blog";

export const generateStaticParams = generateStaticParamsFor("mdxPath");

const themeComponents = getThemeComponents();
type AnyObj = Record<string, any>;
export function UseMDXComponents(components: AnyObj) {
  return {
    ...themeComponents,
    ...components,
  };
}

export async function generateMetadata(props: AnyObj) {
  const params = await props.params;
  const { metadata } = await importPage(params.mdxPath);
  return metadata;
}

export default async function Page(props: AnyObj) {
  const params = await props.params;
  const {
    default: MDXContent,
    toc,
    metadata,
    sourceCode,
  } = await importPage(params.mdxPath);
  return <MDXContent {...props} params={params} />;
}
