import { useRouter } from 'next/router';
import {getLangDict} from './getLangDict';

export const useTranslate = () => {
  const { locale } = useRouter();
  return locale === 'ja' ? getLangDict('ja') : getLangDict('en');
};