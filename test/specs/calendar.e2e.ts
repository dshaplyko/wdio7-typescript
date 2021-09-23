import {
  defaultQuery,
  orangeColor,
  weeksNumber,
  endTimePeriod,
  whiteColor,
  emptyValuePeriod,
  calendarActiveDays,
  grayColor,
  ExtractorType,
} from "../config/const";
import { expectEquality } from "../utils";
import Page from "../pageobjects/page";

describe("Left panel - Fetch traces section - Calendar:", () => {
  beforeEach(async () => {
    Page.openPage("/");
    await Page.leftPanel.buildGraph.textArea.setInputValue(defaultQuery);
    await Page.leftPanel.buildGraph.buttonLoadData.click();
    await Page.leftPanel.fetchTraces.nodesDropdown.selectMenuItemByIndex(1);
    await Page.leftPanel.fetchTraces.buttonFetch.click();
    await Page.mainArea.tracesPanel.waitUntilCollapsed(false);
    await Page.mainArea.tracesPanel.log.waitUntilLogLoaded();
    await Page.leftPanel.fetchTraces.buttonCalendar.click();
  });

  it("Calendar button hover state, [@extended, @low, @jira(BLMBMON-14711)]", async () => {
    await Page.leftPanel.fetchTraces.buttonCalendar.hover();
    expectEquality(await Page.leftPanel.fetchTraces.buttonCalendar.getButtonBackgroundColor(), orangeColor);
  });

  it.skip("Calendar days, [@extended, @low, @jira(BLMBMON-14707)]", async () => {
    await Page.leftPanel.calendar.firstDayOfCalendar.checkIfDisplayed();
    expectEquality(await Page.leftPanel.calendar.weekRows.getElementsCount(), weeksNumber);
    expectEquality(await Page.leftPanel.fetchTraces.buttonCalendar.getButtonBackgroundColor(), orangeColor);
  });

  it("Calendar overview, [@criticalPath, @high, @jira(BLMBMON-14706)]", async () => {
    // await Page.leftPanel.calendar.previousMonth.checkIfDisplayed();
    // await Page.leftPanel.calendar.nextMonth.checkIfDisplayed();
    await Page.leftPanel.calendar.checkIfDisplayed();
    await Page.leftPanel.calendar.timePeriodField.checkIfDisplayed();
    await Page.leftPanel.calendar.buttonApply.checkIfDisplayed();
    await Page.leftPanel.calendar.selectedMonthYear.checkIfDisplayed();
  });

  it("Apply button states, [@criticalPath, @high, @jira(BLMBMON-14701)]", async () => {
    expectEquality(await Page.leftPanel.calendar.buttonApply.isButtonDisabled(), false);

    await Page.leftPanel.calendar.todayDay.click();
    await Page.leftPanel.calendar.inputPeriodFromTo.clearValue();
    await Page.leftPanel.calendar.inputPeriodFromTo.setInputValue(endTimePeriod);
    expectEquality(await Page.leftPanel.calendar.buttonApply.isButtonDisabled(), true);
  });

  it.skip("Month arrows, [@criticalPath, @high, @jira(BLMBMON-14692)]", async () => {
    await Page.leftPanel.calendar.previousMonth.checkIfDisplayed();
    expectEquality(await Page.leftPanel.calendar.nextMonth.isButtonDisabled(), true);

    await Page.leftPanel.calendar.previousMonth.click();
    await Page.leftPanel.calendar.nextMonth.checkIfDisplayed();
    expectEquality(await Page.leftPanel.calendar.previousMonth.isButtonDisabled(), true);
  });

  it.skip("Single day period, [@criticalPath, @high, @jira(BLMBMON-14686)]", async () => {
    const calendarActiveDay: string = await Page.leftPanel.calendar.todayDay.getText();
    const periodActiveDay: string = await Page.leftPanel.fetchTraces.inputPeriodFrom.getInputValue(ExtractorType.Num);
    expectEquality(calendarActiveDay, periodActiveDay);
  });

  //TODO: re-check after styles are fixed
  it.skip("Single day period_Clicking a new day, [@criticalPath, @high, @jira(BLMBMON-14689)]", async () => {
    const datePeriodFromBeforeSelected: string = await Page.leftPanel.calendar.inputPeriodFromTo.getInputValue(
      ExtractorType.Time
    );
    const datePeriodToBeforeSelected: string = await Page.leftPanel.calendar.inputPeriodFromTo.getInputValue(
      ExtractorType.TimeTo
    );
    await Page.leftPanel.calendar.todayDay.click();
    expectEquality(await Page.leftPanel.calendar.todayDay.getBackgroundColor(), orangeColor);

    const datePeriodFromAfterSelected: string = await Page.leftPanel.calendar.inputPeriodFromTo.getInputValue(
      ExtractorType.Time
    );
    const datePeriodToAfterSelected: string = await Page.leftPanel.calendar.inputPeriodFromTo.getInputValue(
      ExtractorType.TimeTo
    );
    expectEquality(datePeriodFromBeforeSelected, datePeriodFromAfterSelected);
    expectEquality(datePeriodToBeforeSelected, datePeriodToAfterSelected);
  });

  it.skip("Applying period time and day chosen in the calendar, [@criticalPath, @high, @jira(BLMBMON-14712)]", async () => {
    await Page.leftPanel.calendar.timePeriodArrowLeft.click();
    await Page.leftPanel.calendar.clickPreviousDay();
    await Page.leftPanel.calendar.buttonApply.click();
    await Page.leftPanel.fetchTraces.buttonCalendar.click();
    const dateFrom: string = await Page.leftPanel.fetchTraces.inputPeriodFrom.getInputValue(ExtractorType.Time);
    const dateTo: string = await Page.leftPanel.fetchTraces.inputPeriodTo.getInputValue(ExtractorType.Time);
    const datePeriodFrom: string = await Page.leftPanel.calendar.inputPeriodFromTo.getInputValue(ExtractorType.Time);
    const datePeriodTo: string = await Page.leftPanel.calendar.inputPeriodFromTo.getInputValue(ExtractorType.TimeTo);
    expectEquality(dateFrom, datePeriodFrom);
    expectEquality(dateTo, datePeriodTo);

    const calendarSelectedDay: string = await Page.leftPanel.calendar.getTextPreviousDay();
    const dateFromNum: string = await Page.leftPanel.fetchTraces.inputPeriodFrom.getInputValue(ExtractorType.Num);
    const dateToNum: string = await Page.leftPanel.fetchTraces.inputPeriodTo.getInputValue(ExtractorType.Num);
    expectEquality(calendarSelectedDay, dateFromNum);
    expectEquality(calendarSelectedDay, dateToNum);
  });
  //TODO: re-check after styles are fixed
  it.skip("Purging time period, [@extended, @medium, @jira(BLMBMON-14693)]", async () => {
    await Page.leftPanel.calendar.inputPeriodFromTo.click();
    expectEquality(await Page.leftPanel.calendar.inputPeriodFromTo.getBorderColor(), whiteColor);

    await Page.leftPanel.calendar.inputPeriodFromTo.clearValue();
    expectEquality(
      await Page.leftPanel.calendar.inputPeriodFromTo.getInputValue(ExtractorType.EmptyValue),
      emptyValuePeriod
    );
  });

  //TODO: re-check after styles are fixed
  it.skip("Active and inactive days, [@extended, @medium, @jira(BLMBMON-14708)]", async () => {
    const activeDays: number = await Page.leftPanel.calendar.getActiveDaysCount();
    expectEquality(activeDays, calendarActiveDays);
    expectEquality(await Page.leftPanel.calendar.nextElementColor(), grayColor);
  });
});
