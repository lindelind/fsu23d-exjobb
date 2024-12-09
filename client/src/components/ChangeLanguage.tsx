import i18n from "../i18n";

export const ChangeLanguage = () => {


 const onClickChangeLanguage = (e: any) => {
    const language = e.target.value;
    i18n.changeLanguage(language);

  }
  
  return (
    <>
      <select onChange={onClickChangeLanguage}>
        <option value="sv">Swedish</option>
        <option value="en">English</option>
      </select>
    </>
  );
}