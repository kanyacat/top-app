import type { Metadata } from 'next'
import { Noto_Sans } from 'next/font/google'
import './globals.css'

const font = Noto_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Top app',
  description: 'помогите умоляю',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <html lang="ru">
      <body className={font.className}>{children}</body>
    </html>
  )
}


// import {Html, Head, Main, NextScript, DocumentContext, DocumentInitialProps} from "next/document";
//
// class MyDocument extends Document {
//
// 	static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
// 		const initialProps = await  Document.getInitialProps(ctx);
// 		return {...initialProps}
// 	}
//
// 	render ():JSX.Element {
// 		return (
// 			<Html lang="ru">
// 				<Head />
// 				<body>
// 				<Main />
// 				<NextScript />
// 				</body>
// 			</Html>
// 		);
// 	}
// }
//
// export default MyDocument