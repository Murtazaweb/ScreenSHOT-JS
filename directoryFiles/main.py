from slugify import slugify
import sys
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
from selenium import webdriver
from scrapy import Selector
from urllib.parse import urlparse

options = webdriver.ChromeOptions()
options.headless = True
driver = webdriver.Chrome(executable_path=ChromeDriverManager().install(), options=options)
driver.implicitly_wait(10)


def get_screenshot(urls):
    name = slugify(domain)
    counter = 1
    for url in urls:
        try:
            if '.json' not in url:
                filename = 'directoryFiles/' + domain + '/' + name + str(counter) + '.png'
                print('Capturing:', url)
                driver.get(url)
                S = lambda X: driver.execute_script('return document.body.parentNode.scroll' + X)
                driver.set_window_size(S('Width'), S('Height'))
                driver.find_element(By.TAG_NAME,  'body').screenshot(filename)
                print(filename, 'captured!')
                counter += 1
        except:
            pass


if __name__ == '__main__':
    main_url = sys.argv[1]
    print('Target website:', main_url)
    driver.get(main_url)
    response = Selector(text=driver.page_source)
    hrefs = response.css('::attr(href)').getall()
    links = [main_url]
    domain = urlparse(main_url).netloc

    for href in hrefs:
        try:
            if '.css' not in href:
                if domain in href:
                    links.append(href)
                if href[0] == '/':
                    href = main_url + href[1:]
                    links.append(href)
        except IndexError:
            pass
    get_screenshot(list(set(links)))
    driver.close()
